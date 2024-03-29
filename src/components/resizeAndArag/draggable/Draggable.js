// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {createCSSTransform, createSVGTransform} from './utils/domFns';
import {canDragX, canDragY, createDraggableData, getBoundPosition} from './utils/positionFns';
import {dontSetMe} from './utils/shims';
import DraggableCore from './DraggableCore';
import type {ControlPosition, PositionOffsetControlPosition, DraggableCoreProps} from './DraggableCore';
import type {Bounds, DraggableEventHandler} from './utils/types';
import type {Element as ReactElement} from 'react';

type DraggableState = {
  dragging: boolean,
  dragged: boolean,
  x: number, y: number,
  slackX: number, slackY: number,
  isElementSVG: boolean,
  prevPropsPosition: ?ControlPosition,
};

export type DraggableProps = {
  ...$Exact<DraggableCoreProps>,
  axis: 'both' | 'x' | 'y' | 'none',
  bounds: Bounds | string | false,
  defaultClassName: string,
  defaultClassNameDragging: string,
  defaultClassNameDragged: string,
  defaultPosition: ControlPosition,
  positionOffset: PositionOffsetControlPosition,
  position: ControlPosition,
  scale: number
};

//
// Define <Draggable>
//

class Draggable extends React.Component<DraggableProps, DraggableState> {

  static displayName = 'Draggable';

  static propTypes = {
    // Accepts all props <DraggableCore> accepts.
    ...DraggableCore.propTypes,
    axis: PropTypes.oneOf(['both', 'x', 'y', 'none']),

    bounds: PropTypes.oneOfType([
      PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number
      }),
      PropTypes.string,
      PropTypes.oneOf([false])
    ]),

    defaultClassName: PropTypes.string,
    defaultClassNameDragging: PropTypes.string,
    defaultClassNameDragged: PropTypes.string,
    defaultPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    positionOffset: PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    className: dontSetMe,
    style: dontSetMe,
    transform: dontSetMe
  };

  static defaultProps = {
    ...DraggableCore.defaultProps,
    axis: 'both',
    bounds: false,
    defaultClassName: 'react-draggable',
    defaultClassNameDragging: 'react-draggable-dragging',
    defaultClassNameDragged: 'react-draggable-dragged',
    defaultPosition: {x: 0, y: 0},
    position: null,
    scale: 1
  };

  // React 16.3+
  // Arity (props, state)
  static getDerivedStateFromProps({position}: DraggableProps, {prevPropsPosition}: DraggableState) {
    // Set x/y if a new position is provided in props that is different than the previous.
    if (
        position &&
        (!prevPropsPosition ||
            position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y
        )
    ) {
      return {
        x: position.x,
        y: position.y,
        prevPropsPosition: {...position}
      };
    }
    return null;
  }

  constructor(props: DraggableProps) {
    super(props);

    this.state = {
      // Whether or not we are currently dragging.
      dragging: false,

      // Whether or not we have been dragged before.
      dragged: false,

      // Current transform x and y.
      x: props.position ? props.position.x : props.defaultPosition.x,
      y: props.position ? props.position.y : props.defaultPosition.y,

      prevPropsPosition: {...props.position},

      // Used for compensating for out-of-bounds drags
      slackX: 0, slackY: 0,

      // Can only determine if SVG after mounting
      isElementSVG: false
    };

    if (props.position && !(props.onDrag || props.onStop)) {
      // eslint-disable-next-line no-console
      console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' +
          'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' +
          '`position` of this element.');
    }
  }

  componentDidMount() {
    if(typeof window.SVGElement !== 'undefined' && ReactDOM.findDOMNode(this) instanceof window.SVGElement) {
      this.setState({isElementSVG: true});
    }
  }

  componentWillUnmount() {
    this.setState({dragging: false}); // prevents invariant if unmounted while dragging
  }

  onDragStart: DraggableEventHandler = (e, coreData) => {

    // Short-circuit if user's callback killed it.
    const shouldStart = this.props.onStart(e, createDraggableData(this, coreData));
    // Kills start event on core as well, so move handlers are never bound.
    if (shouldStart === false) return false;

    this.setState({dragging: true, dragged: true});
  };

  onDrag: DraggableEventHandler = (e, coreData) => {
    if (!this.state.dragging) return false;

    const uiData = createDraggableData(this, coreData);
    const newState: $Shape<DraggableState> = {
      x: uiData.x,
      y: uiData.y
    };

    // Keep within bounds.
    if (this.props.bounds) {
      // Save original x and y.
      const {x, y} = newState;

      // Add slack to the values used to calculate bound position. This will ensure that if
      // we start removing slack, the element won't react to it right away until it's been
      // completely removed.
      newState.x += this.state.slackX;
      newState.y += this.state.slackY;

      // Get bound position. This will ceil/floor the x and y within the boundaries.
      const [newStateX, newStateY] = getBoundPosition(this, newState.x, newState.y);
      newState.x = newStateX;
      newState.y = newStateY;

      // Recalculate slack by noting how much was shaved by the boundPosition handler.
      newState.slackX = this.state.slackX + (x - newState.x);
      newState.slackY = this.state.slackY + (y - newState.y);

      // Update the event we fire to reflect what really happened after bounds took effect.
      uiData.x = newState.x;
      uiData.y = newState.y;
      uiData.deltaX = newState.x - this.state.x;
      uiData.deltaY = newState.y - this.state.y;
    }

    // Short-circuit if user's callback killed it.
    const shouldUpdate = this.props.onDrag(e, uiData);
    if (shouldUpdate === false) return false;
    this.setState(newState);
  };

  onDragStop: DraggableEventHandler = (e, coreData) => {
    if (!this.state.dragging) return false;
    // Short-circuit if user's callback killed it.
    const shouldContinue = this.props.onStop(e, createDraggableData(this, coreData));
    if (shouldContinue === false) return false;

    const newState: $Shape<DraggableState> = {
      dragging: false,
      slackX: 0,
      slackY: 0
    };

    // If this is a controlled component, the result of this operation will be to
    // revert back to the old position. We expect a handler on `onDragStop`, at the least.
    const controlled = Boolean(this.props.position);
    if (controlled) {
      const {x, y} = this.props.position;
      newState.x = x;
      newState.y = y;
    }

    this.setState(newState);
  };

  render(): ReactElement<any> {
    const {
      axis,
      bounds,
      children,
      defaultPosition,
      defaultClassName,
      defaultClassNameDragging,
      defaultClassNameDragged,
      position,
      positionOffset,
      scale,
      ...draggableCoreProps
    } = this.props;
    let style = {};
    let svgTransform = null;

    const controlled = Boolean(position);
    const draggable = !controlled || this.state.dragging;

    const validPosition = position || defaultPosition;
    const transformOpts = {
      x: canDragX(this) && draggable ?
          this.state.x :
          validPosition.x,
      y: canDragY(this) && draggable ?
          this.state.y :
          validPosition.y
    };
    if (this.state.isElementSVG) {
      svgTransform = createSVGTransform(transformOpts, positionOffset);
    } else {
      style = createCSSTransform(transformOpts, positionOffset);
    }
    const className = classNames((children.props.className || ''), defaultClassName, {
      [defaultClassNameDragging]: this.state.dragging,
      [defaultClassNameDragged]: this.state.dragged
    });
    return (
        <DraggableCore {...draggableCoreProps} scale={scale} onStart={this.onDragStart} onDrag={this.onDrag} onStop={this.onDragStop}>
          {React.cloneElement(React.Children.only(children), {
            className: className,
            style: {...children.props.style, ...style},
            transform: svgTransform
          })}
        </DraggableCore>
    );
  }
}

export {Draggable as default, DraggableCore};

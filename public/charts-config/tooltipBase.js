import lineStyle from "./lineStyle";
import textStyle from "./textStyle";
import shapeStyle from "./shapeStyle";
const tooltipBase = {
    "type": "object",
    "title": "tooltip配置",
    "properties": {
        "showTitle": {
            "title": "展示标题",
            "ui:widget": "BooleanButton",
            "description": "是否展示 tooltip 标题。"
        },
        "follow": {
            "title": "跟随鼠标移动",
            "ui:widget": "BooleanButton",
            "description": "设置 tooltip 内容框是否跟随鼠标移动。"
        },
        "enterable": {
            "title": "允许鼠标滑入",
            "ui:widget": "BooleanButton",
            "description": "tooltip 是否允许鼠标滑入。"
        },
        "title":  {
            "type": "string",
            "title": "标题内容",
            "description": "设置 tooltip 的标题内容：如果值为数据字段名，则会展示数据中对应该字段的数值，如果数据中不存在该字段，则直接展示 title 值。"
        },
        "position": {
            "type": "string",
            "title": "展示位置",
            "description": "设置 tooltip 的固定展示位置，相对于数据点。",
            "enum": [
                "top",
                "bottom",
                "left",
                "right"
            ],
            "enumNames": [
                "顶部",
                "底部",
                "左侧",
                "右侧"
            ]
        },
        "shared": {
            "title": "共享数据",
            "ui:widget": "BooleanButton",
            "description": "true 表示合并当前点对应的所有数据并展示，false 表示只展示离当前点最逼近的数据内容。"
        },
        "showCrosshairs": {
            "title": "展示辅助线",
            "ui:widget": "BooleanButton"
        },
        "crosshairs": {
            "type": "object",
            "title": "辅助线",
            "ui:hidden": "{{rootValue.showCrosshairs !== true}}",
            "properties": {
                "type": {
                    "type": "string",
                    "title": "辅助线",
                    "description": "辅助线的类型",
                    "enum": [
                        "_x",
                        "y",
                        "xy_"
                    ],
                    "enumNames": [
                        "x轴",
                        "y轴",
                        "xy轴"
                    ]
                },
                "line": lineStyle,
                "text": textStyle,
                "textBackgroundStyle": {
                    "type": "object",
                    "title": "辅助线文本背景",
                    "properties": {
                        "padding": {
                            "type": "array",
                            "title": "文本背景周围的留白",
                            "description": "第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。",
                            "ui:widget": "ArrayNumber"
                        },
                        "style": shapeStyle
                    },
                    "follow": {
                        "title": "否跟随鼠标移动",
                        "ui:widget": "BooleanButton",
                        "description": "辅助线是否跟随鼠标移动，默认为 false，即定位到数据点。"
                    }
                }
            }
        },
        "showMarkers": {
            "title": "是否渲染Markers",
            "ui:widget": "BooleanButton",
            "description": "是否渲染 tooltipMarkers。"
        },
        "showContent": {
            "title": "是否展示内容框",
            "ui:widget": "BooleanButton",
            "description": "是否展示 tooltip 内容框。"
        },
        "container": {
            "type": 'string',
            "title": "自定义容器",
            "ui:widget": "string:textarea"
        },
        "offset": {
            "title": "偏移量",
            "type": "string",
            "pattern": "^\\d{1,3}$|^1000$",
            "description": "设置偏移量距离,在0到1000之间",
            "message": {
                "pattern": "输入正确偏移量"
            },
            "ui:options": {
                "addonAfter": "px"
            }
        },
    }
}

export default tooltipBase
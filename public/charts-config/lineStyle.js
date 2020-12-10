export default {
    "title": "线的样式",
    "type": "object",
    "properties": {
        "stroke": {
            "type": "string",
            "format": "color",
            "title": "线的颜色"
        },
        "lineWidth": {
            "title": "线的宽度",
            "type": "string",
            "pattern": "^\\d{1,3}$|^1000$",
            "description": "在0到1000之间",
            "message": {
                "pattern": "输入正确位置"
            },
            "ui:options": {
                "addonAfter": "px"
            }
        },
        "lineDash": {
            "type": "array",
            "title": "虚线配置",
            "description": "第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。",
            "ui:widget": "ArrayNumber"
        },
        "opacity": {
            "type": "number",
            "title": "透明度",
            "ui:widget": "SliderNumber",
            "min": 0,
            "max": 1,
            "step": 0.01
        },
        "shadowColor": {
            "type": "string",
            "format": "color",
            "title": "阴影颜色"
        },
        "shadowBlur": {
            "type": "number",
            "title": "高斯模糊系数",
            "min": 0,
            "max": 20,
            "step": 1
        },
        "shadowOffsetX": {
            "title": "水平距离",
            "type": "string",
            "pattern": "^\\d{1,3}$|^1000$",
            "description": "设置阴影距图形的水平距离,在0到1000之间",
            "message": {
                "pattern": "输入正确距离"
            },
            "ui:options": {
                "addonAfter": "px"
            }
        },
        "shadowOffsetY": {
            "title": "垂直距离",
            "type": "string",
            "pattern": "^\\d{1,3}$|^1000$",
            "description": "设置阴影距图形的垂直距离,在0到1000之间",
            "message": {
                "pattern": "输入正确距离"
            },
            "ui:options": {
                "addonAfter": "px"
            }
        },
        "cursor": {
            "title": "鼠标样式",
            "type": "string",
            "description": "同 css 的鼠标样式。",
            "enum": [
                "default",
                "auto",
                "crosshair",
                "pointer",
                "move",
                "e-resize",
                "ne-resize",
                "nw-resize",
                "n-resize",
                "se-resize",
                "sw-resize",
                "s-resize",
                "w-resize",
                "text",
                "wait",
                "help"
            ],
            "enumNames": [
                "默认光标（通常是一个箭头）",
                "浏览器设置的光标",
                "十字线",
                "指示链接的指针（一只手）",
                "可被移动",
                "边缘可被向右（东）移动",
                "边缘可被向上及向右移动（北/东）",
                "边缘可被向上及向左移动（北/西）",
                "边缘可被向上（北）移动",
                "边缘可被向下及向右移动（南/东）",
                "边缘可被向下及向左移动（南/西）",
                "边缘可被向下移动（南）",
                "边缘可被向左移动（西）",
                "文本",
                "程序正忙（通常是一只表或沙漏）",
                "可用的帮助（通常是一个问号或一个气球）"
            ]
        }
    }
}
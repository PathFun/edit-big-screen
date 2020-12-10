export default {
    "title": "辅助线文本配置",
    "type": "object",
    "properties": {
        "fontSize": {
            "title": "字体大小",
            "type": "string",
            "pattern": "^\\d{1,3}$|^1000$",
            "description": "在0到1000之间",
            "message": {
                "pattern": "输入正确的字体大小"
            },
            "ui:options": {
                "addonAfter": "px"
            }
        },
        "fontFamily": {
            "title": "文字字体",
            "type": "string",
        },
        "fontWeight": {
            "title": "字体粗细",
            "type": "number",
            "description": "同 css 的字体粗细样式。",
            "enum": [100, 200, 300, 400, 500, 600, 700, 800, 900],
            "enumNames": [100, 200, 300, 400, 500, 600, 700, 800, 900]
        },
        "lineHeight": {
            "type": "number",
            "title": "文字的行高"
        },
        "textAlign": {
            "type": "string",
            "title": "文本对齐方式",
            "enum": ["center", "end", "left", "right", "start"],
            "enumNames": ["center", "end", "left", "right", "start"]
        },
        "fill": {
            "type": "string",
            "format": "color",
            "title": "文字填充颜色"
        },
        "fillOpacity": {
            "type": "number",
            "title": "文字填充透明度",
            "ui:widget": "SliderNumber",
            "min": 0,
            "max": 1,
            "step": 0.01
        },
        "stroke": {
            "type": "string",
            "title": "文字的描边",
        },
        "lineWidth": {
            "title": "文字描边宽度",
            "type": "string",
            "pattern": "^\\d{1,3}$|^1000$",
            "description": "在0到1000之间",
            "message": {
                "pattern": "输入正确的描边宽度"
            },
            "ui:options": {
                "addonAfter": "px"
            }
        },
        "lineDash": {
            "type": "array",
            "title": "描边虚线配置",
            "description": "第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。",
            "ui:widget": "ArrayNumber"
        },
        "lineOpacity": {
            "type": "number",
            "title": "描边透明度",
            "ui:widget": "SliderNumber",
            "min": 0,
            "max": 1,
            "step": 0.01
        },
        "opacity": {
            "type": "number",
            "title": "整体透明度",
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
        "strokeOpacity": {
            "type": "number",
            "title": "图形边框透明度",
            "ui:widget": "SliderNumber",
            "min": 0,
            "max": 1,
            "step": 0.01
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
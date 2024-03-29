export default {
    "propsSchema": {
        "type": "object",
        "properties": {
            "baseStyle": {
                "title": "基本配置",
                "type": "object",
                "properties": {
                    "name": {
                        "title": "大屏名称",
                        "type": "string"
                    },
                    "remarks": {
                        "title": "大屏描述",
                        "type": "string"
                    },
                    "width": {
                        "type": "string",
                        "title": "大屏宽度",
                        "pattern": "^\\d{1,5}$|^100000$",
                        "description": "在0到100000之间",
                        "message": {
                            "pattern": "输入正确宽度"
                        },
                        "ui:options": {
                            "suffix": "px"
                        }
                    },
                    "height": {
                        "type": "string",
                        "title": "大屏高度",
                        "pattern": "^\\d{1,5}$|^100000$",
                        "description": "在0到100000之间",
                        "message": {
                            "pattern": "输入正确高度"
                        },
                        "ui:options": {
                            "suffix": "px"
                        }
                    }
                }
            },
            "bgStyle": {
                "title": "大屏背景",
                "type": "object",
                "properties": {
                    "isColor": {
                        "ui:widget": "BooleanButton",
                        "title": "背景模式"
                    },
                    "backgroundImg": {
                        "type": "string",
                        "title": "背景图片",
                        "format": "image",
                        "ui:hidden": "{{rootValue.isColor === true}}"
                    },
                    "backgroundColor": {
                        "type": "string",
                        "title": "背景颜色",
                        "format": "color",
                        "ui:labelWidth": 80,
                        "ui:hidden": "{{rootValue.isColor === false}}"
                    },
                    "opacity": {
                        "type": "number",
                        "title": "背景透明度",
                        "ui:options": {
                            "min": 0,
                            "max": 1,
                            "step": 0.1
                        }
                    }
                }
            },
            "workerMark": {
                "type": "object",
                "title": "水印配置",
                "properties": {
                    "creation": {
                        "ui:widget": "BooleanButton",
                        "title": "开启水印"
                    },
                    "width": {
                        "type": "number",
                        "title": "画布宽度",
                        "ui:options": {
                            "min": 10,
                            "max": 1000
                        },
                        "ui:hidden": "{{rootValue.creation === false}}"
                    },
                    "height": {
                        "type": "number",
                        "title": "画布高度",
                        "ui:options": {
                            "min": 10,
                            "max": 1000
                        },
                        "ui:hidden": "{{rootValue.creation === false}}"
                    },
                    "x": {
                        "type": "number",
                        "title": "x轴位置",
                        "ui:options": {
                            "min": 10,
                            "max": 1000
                        },
                        "ui:hidden": "{{rootValue.creation === false}}"
                    },
                    "y": {
                        "type": "number",
                        "title": "y轴位置",
                        "ui:options": {
                            "min": 10,
                            "max": 1000
                        },
                        "ui:hidden": "{{rootValue.creation === false}}"
                    },
                    "txt": {
                        "type": "string",
                        "title": "水印文本",
                        "ui:hidden": "{{rootValue.creation === false}}"
                    },
                    "mode": {
                        "type": "string",
                        "title": "渲染模式",
                        "ui:hidden": "{{rootValue.creation === false}}"
                    },
                    "fontSize": {
                        "type": "number",
                        "title": "字体大小",
                        "ui:hidden": "{{rootValue.creation === false}}",
                        "ui:options": {
                            "min": 5,
                            "max": 48
                        }
                    },
                    "color": {
                        "type": "string",
                        "title": "字体颜色",
                        "format": "color",
                        "ui:labelWidth": 80,
                        "ui:hidden": "{{rootValue.creation === false}}"
                    },
                    "alpha": {
                        "type": "number",
                        "title": "文本透明度",
                        "ui:options": {
                            "min": 0,
                            "max": 1,
                            "step": 0.1
                        },
                        "ui:hidden": "{{rootValue.creation === false}}"
                    },
                    "angle": {
                        "type": "number",
                        "title": "文本倾斜度",
                        "ui:options": {
                            "min": -90,
                            "max": 90
                        },
                        "ui:hidden": "{{rootValue.creation === false}}"
                    }
                }
            }
        }
    },
    "uiSchema": {
        "bgStyle": {
            "isColor": {
                "ui:options": {
                    "defaultValue": true,
                    "children": [
                        {
                            "label": "背景颜色",
                            "value": true
                        },
                        {
                            "label": "背景图片",
                            "value": false
                        }
                    ]
                }
            }
        },
        "workerMark": {
            "mode": {
                "ui:widget": "BooleanButton",
                "ui:options": {
                    "defaultValue": "svg",
                    "children": [
                        {
                            "label": "canvas",
                            "value": "canvas"
                        },
                        {
                            "label": "svg",
                            "value": "svg"
                        },
                        {
                            "label": "element",
                            "value": "element"
                        }
                    ]
                }
            }
        }
    }
}

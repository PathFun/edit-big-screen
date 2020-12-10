export default {
    "propsSchema": {
        "type": "object",
        "properties": {
            "name": {
                "title": "图表名称",
                "type": "string"
            },
            "remarks": {
                "title": "图表备注",
                "type": "string"
            },
            "position": {
                "type": "object",
                "title": "图表位置",
                "properties": {
                    "x": {
                        "title": "距离左边位置",
                        "type": "string",
                        "pattern": "^\\d{1,4}$|^10000$",
                        "description": "在0到10000之间",
                        "message": {
                            "pattern": "输入正确位置"
                        },
                        "ui:options": {
                            "addonAfter": "px"
                        }
                    },
                    "y": {
                        "title": "距离上面位置",
                        "type": "string",
                        "pattern": "^\\d{1,4}$|^10000$",
                        "message": {
                            "pattern": "输入正确位置"
                        },
                        "description": "在0到10000之间",
                        "ui:options": {
                            "addonAfter": "px"
                        }
                    }
                }
            },
            "size": {
                "type": "object",
                "title": "图表大小",
                "properties": {
                    "width": {
                        "title": "宽度",
                        "type": "string",
                        "pattern": "^\\d{1,4}$|^10000$",
                        "description": "在0到10000之间",
                        "message": {
                            "pattern": "输入正确宽度"
                        },
                        "ui:options": {
                            "addonAfter": "px"
                        }
                    },
                    "height": {
                        "title": "高度",
                        "type": "string",
                        "pattern": "^\\d{1,4}$|^10000$",
                        "description": "在0到10000之间",
                        "message": {
                            "pattern": "输入正确高度"
                        },
                        "ui:options": {
                            "addonAfter": "px"
                        }
                    }
                }
            },
            "padding": {
                "type": "object",
                "title": "内边距",
                "properties": {
                    "top": {
                        "title": "上下边距",
                        "type": "string",
                        "pattern": "^\\d{1,4}$|^10000$",
                        "description": "在0到10000之间",
                        "message": {
                            "pattern": "输入正确上下边距"
                        },
                        "ui:options": {
                            "addonAfter": "px"
                        }
                    },
                    "left": {
                        "title": "左右边距",
                        "type": "string",
                        "pattern": "^\\d{1,4}$|^10000$",
                        "description": "在0到10000之间",
                        "message": {
                            "pattern": "输入正确左右边距"
                        },
                        "ui:options": {
                            "addonAfter": "px"
                        }
                    }
                }
            }
        }
    }
}

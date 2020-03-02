var EcharPatternSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAOCAIAAAHqM/pXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMDljMGY1ZC1mOTUxLTJlNDMtOTYwYi1kNmI3Yzk3Y2IyMDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTBBQTI3RjNBQjExMTFFNzg5MUFBMkQ3Q0JCOTlDNjciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTBBQTI3RjJBQjExMTFFNzg5MUFBMkQ3Q0JCOTlDNjciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkZGYxNzI4OS0wM2Y1LTQxMGEtYjMyNy04NGVmNWEwOGRmNTAiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyZmFjMmNkOC05MmFmLTExZTctODUxYi1jOWRmNGMzMWMyZTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/NRbMAAAA60lEQVR42mJQMHBg+vf7L0AAMSgbOjH9+/sPIIAY5XXsmJgYmf7//8fAwAAQQMyqxm4/GLmY/v75/e/PHyYmJmagIBMDw38gBRBAjPK6DqysrP/+/Xn+4hVQ/V+G/0BNQPofE5AFUgMkGRkAAhA1RikAwCAIndH9j7mxQ8xm9VGBIL0UCgZsn0s+z1QIow5eeH4JNqHKl1ZD1DKmrsdS2sb6AhQ9bTcAhCDMorfW7T+UoSJFJXyQ0Gck+Lt1Gx99hkzkEGo0yfrUQadYtlXRypU8WjAdiOrAdQuEVZHEP/NKUqhc0XAjku+dswBHwnj/mZ2zzAAAAABJRU5ErkJggg==';

var EcharbluePatternSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAOCAIAAAEbOKHaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMDljMGY1ZC1mOTUxLTJlNDMtOTYwYi1kNmI3Yzk3Y2IyMDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTQ2NkY4OEJBQTdFMTFFN0JFMkZEQTYxOTE4MzQzOEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTQ2NkY4OEFBQTdFMTFFN0JFMkZEQTYxOTE4MzQzOEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowYWI3NjM0OS0yZTU3LTRhMDQtYjNhMS1jZDZjMmE0Y2NjM2QiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyZmFjMmNkOC05MmFmLTExZTctODUxYi1jOWRmNGMzMWMyZTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6gF9d5AAAA5klEQVR42mKQar7BxC4kBRBADFIVR5nYBcQBAoiRN2UV08/PTAyMDAyM/wECiAEoyyGiyvT54SUGBgYmEUMPhv//mN5c2AHkAQQQSCVI8Ofnnzt7WHjl9YAchq9vf/79xcQAB///AwQQI9AIIOPdJB8WiCkMjKwwBf/+QPW9+/+fBeQIkCwDy893z8B6/7F8fgTWwcAMEGCMwsUH4IYy/fj4bV01SOW3F3cQor++/P39E8hg4ZJQgYsyfv/wBWwYC4+sFsJdX15/YfgPdB2SU2EOBqn98uQasgkM4NBg+fYcxTYGsAkA8XNWhUZttPsAAAAASUVORK5CYII=';

var EchargreenPatternSrc =  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAOCAIAAAEbOKHaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMDljMGY1ZC1mOTUxLTJlNDMtOTYwYi1kNmI3Yzk3Y2IyMDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTBEQTkyNURBQTdFMTFFN0JFMkZEQTYxOTE4MzQzOEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTBEQTkyNUNBQTdFMTFFN0JFMkZEQTYxOTE4MzQzOEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowYWI3NjM0OS0yZTU3LTRhMDQtYjNhMS1jZDZjMmE0Y2NjM2QiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyZmFjMmNkOC05MmFmLTExZTctODUxYi1jOWRmNGMzMWMyZTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7nY2sYAAAA8UlEQVR42mKo+5jL9J9PGCCAGIpupjEx8AkBBBBjww3vL6//MjGAAUAAMQBlWfnlmZie32P4/4/pr7opAyMjE/PN00xs7AABBFIJVAFUPMn3Oss/SSUg5x/jT4b/12GaGRiYeIQAAogRaASQ1S63iQVkChAwMsAU/PsH1cfAcJEF5AigDlYuFsZPb0FCrCxQHf++fwYIMMb6J9FwU7+8+j3J8QSQwcL05inCrnf/GIFmA0X/iUjDRf/9/f3//32wqLg8XPT//58MjCeAXkE4FSLMIibNwMTEwvTyIVyQ8c3vv2+eMwuLo9n2n4mRifHDOwBIRlMUnNIJKwAAAABJRU5ErkJggg==';

var EcharyellowPatternSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAOCAIAAAEbOKHaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMDljMGY1ZC1mOTUxLTJlNDMtOTYwYi1kNmI3Yzk3Y2IyMDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTMxRUMzMEFBQTdFMTFFN0JFMkZEQTYxOTE4MzQzOEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTMxRUMzMDlBQTdFMTFFN0JFMkZEQTYxOTE4MzQzOEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowYWI3NjM0OS0yZTU3LTRhMDQtYjNhMS1jZDZjMmE0Y2NjM2QiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyZmFjMmNkOC05MmFmLTExZTctODUxYi1jOWRmNGMzMWMyZTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5BnzESAAAA00lEQVR42mL48IaJ4dV/BoAAYrh+lYPpt8A/gABi/H2a7dkbViYGoBADA0AAMQBl2QXkmLjvswA5TO9NfoEowdNs////BwggkEogD6hYLVKY5aviHyDnGxcTkGRh/AfSCyQZmZgAAghkBMQUFogpIBMYYACqD8T6JfwPymJ/DVIA1MvC9QCk49/fvwABxvjtNgtc07PXrNpeoiCVHE+Z4aLs76Bslh/Sf+GiP9mglrF8k0OI/mCFqWVABowMjCwgCaC9CHM5XjP9//MXbNtzJFGYbQD2hz+bYH6kHgAAAABJRU5ErkJggg==';

var EcharskybluePatternSrc =  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAOCAIAAAEbOKHaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMDljMGY1ZC1mOTUxLTJlNDMtOTYwYi1kNmI3Yzk3Y2IyMDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTMxRUMzMTJBQTdFMTFFN0JFMkZEQTYxOTE4MzQzOEUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTMxRUMzMTFBQTdFMTFFN0JFMkZEQTYxOTE4MzQzOEUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowYWI3NjM0OS0yZTU3LTRhMDQtYjNhMS1jZDZjMmE0Y2NjM2QiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyZmFjMmNkOC05MmFmLTExZTctODUxYi1jOWRmNGMzMWMyZTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5GFdwEAAAA30lEQVR42mJgefGfgfH3f4AAYmC/+JzpryADQAAxch77z/T2BRMDEDAyAAQQA1CWXUCOifUeAwMTE9MPU5AwE8dpBkYmZoAAAqkE8d69+Jtgy/JbCSTFzMPIyMgA1gwC////+wMQQIwgC4AyGvIsIFOAgswsTHB5qD4WZmaWv8Jg1v+/LMxvIdKMMB0M/wECjJH92n+YqQzMb178C7QC0iwsT+GCDEzvGf6BnPyX5Y80QpSZnZGRhQ1skzxC9B/7f+bfP4HmMjGggv+MIGtYWB8imfCG4R8TC8gEDNtAagGFfUYzp6I4bgAAAABJRU5ErkJggg==';

var EcharPatternSrc2 = 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAGCAIAAAGx3YAdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMDljMGY1ZC1mOTUxLTJlNDMtOTYwYi1kNmI3Yzk3Y2IyMDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjhCNjJBN0RBQTQ3MTFFNzgzREZEMkVDQkJGRjk1RDUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjhCNjJBN0NBQTQ3MTFFNzgzREZEMkVDQkJGRjk1RDUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MGQ1NDU2NC0wNGUyLTRjNDEtYTI5YS03NDYwZWU4ZGFlNDUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyZmFjMmNkOC05MmFmLTExZTctODUxYi1jOWRmNGMzMWMyZTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz43YwcTAAAA2ElEQVR42mLkEFJkZGZhAIL//xgYmQACiJFTVJWB4R8DAxNQBCCAGCXmL2XAAQACCKKQAa4RSkLkoPoYgXJAkpHh/3+4PoAAYmQXlMdlJhMTy79/f2CmIkn8ZwAIIEaEO2Hg3+9fTKxsuLhAwPL//7//f36hOpvh359fjCCXAQ39D+L+/oViD04vM6I6CQkABBjQSwpAIxmZmRhwg/9A8PcvIxMT2G6QLiD7/79/UFOBjvn3j5GZmZGREZd2cMAuWMpAMmCERQGq+//j08OCXxqXJ5FjmkgAAP2oRNabQafBAAAAAElFTkSuQmCC';


/**************安全概况*************/
var Echarbaselabels = {
  show: true,
    position: 'outside',
    formatter: ['{b|{b}}','{d|{d}%}'].join('\n'),
  rich:{
    b:{
      color:'rgba(255,255,255,0.7)',
      fontSize:16,

      lineHeight:26,
    },
    d:{
      color:'#2bede6',
      fontSize:16,
      fontFamily:"ElementalEnd"

    }
  }
};

var Echaroption15 = {
    color: ['#5ae33b', '#ed622b', '#2bede6'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
    {
      name: '安全概况',
      type: 'pie',
      center:['50%','50%'],
      radius: ['40%', '54%'],
      avoidLabelOverlap: false,
      label: {
        normal: [],
        emphasis: []
      },
      labelLine: {
        normal: {
          show: true,
          lineStyle:{color:'#2bede6'}
        }
      },
      data: [
        {
        value: [],
        name: 'web漏洞'
      }, {
        value: [],
        name: '主机漏洞'
      }, {
        value: [],
        name: '弱口令'
      }]
    },
    {
      name: '',
      type: 'pie',
      center:['50%','50%'],
      radius: ['32%', '35%'],
      avoidLabelOverlap: false,  //是否启用防止标签重叠策略，默认开启
      hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
      itemStyle: {
        normal: {
          color: '#198287'
        }
      },
      label: {
        normal: {
          show: false
        }
      },
      data: [{
        name: '',
        value: 1,
        tooltip:{show:false}
      }],

       }]
};

/************钓鱼网站****************/

var Echaroption2 = {
    radar: {
        center: ['50%','50%'],
        radius: 70,
        indicator: [
           {
            max: []},
           {
            max: []},
           {
            max: []},
           {
            max: []},
           {
            max: []},
        ],
        splitLine:{
          lineStyle:{
            color:'#292e4b',
          }
        },
        splitArea: {show: false },
        axisLine:{ show:false}

    },
    series: [{
        name: '钓鱼网站分类',
        type: 'radar',
        symbol: 'circle',
        symbolSize:6,
        lineStyle:{
          normal:{
            color:'#f34336',
            opacity:0.0
          }
          },
        itemStyle: {
              normal: {
                  color: '#f34336'
              }
          },
          areaStyle: {
              normal: {
                  opacity: 0.9
              }
          },
        data : [
            {
                value : [],
                name : '钓鱼网站分类',
                label:{
                  normal:{
                    show:true,
                    formatter:function(params) {
                              return params.value;
                          },
                          // position:'outsideTop',
                          textStyle:{
                            fontSize:16,
                            color:'#fff'
                          }
                  }
                }
            },
        ],
    }]
};

var Echaroption3 = {
  color:['#23ffff'],
  tooltip : {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  grid: {
    left: '4%',
    right:'4%',
    top:'16%',
    bottom: '10%',
    containLabel: true
  },
  xAxis : [
    {
      type : 'category',
      boundaryGap : false,
      axisLabel:{
      textStyle:{
          color:'rgba(255,255,255,0.7)',
          fontSize:12,
            fontFamily:"ElementalEnd"
        }
      },
      data : []
    }
  ],
  yAxis: [{
      type: 'value',
        min: 0,
      max: 10,
          splitNumber: 5,
        scale:'true',
        axisLine:{show:false,},
      axisLabel:{
        textStyle:{
          color:'rgba(255,255,255,0.7)',
          //fontSize:12,
          fontFamily:"ElementalEnd"
        }
      },
        axisTick:{show:false},
      splitLine: { //坐标轴在 grid 区域中的分隔线；
        show: true,
        lineStyle: { //分割线颜色，可设单个，也可以设置数组。
          color: '#202f41',
        },

      },
    }],
  series: [
    {
      name:'增长数量',
      type:'line',
      //stack: '总量',
      symbol: 'circle',
      symbolSize: 1,
      showSymbol: true,
      areaStyle: {normal: {}},
      data:[]
    },
  ]
};

/************Web漏洞、主机漏洞、弱口令饼图****************/
//web漏洞
var Echaroption33 = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series: [
       {
        type: 'pie',
        hoverAnimation: false,
        data: [],
        center:['50%','50%'],
        radius: ['42%', '58%'],
        itemStyle: {
          normal: {
            color: 'rgba(255,255,255,0)',
            borderColor:'#000',
            borderWidth: 3,
            opacity: 1
          }
        },
        label: {
          normal: {
            show: false,
            position: 'inside'
          }
        }
      },
       {
        name: '风险',
        type: 'pie',
        //     selectedMode: 'single',
        hoverAnimation: true,
        zlevel: 2,
        radius: ['42%', '58%'],
        center:['50%','50%'],
        label: {
          normal: {
            show: false,
            position: 'inner',
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
          value: [],
          name: '紧急',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        },
          {
          value: [],
          name: '高风险',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        },
          {
          value: [],
          name: '中风险',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        },
          {
          value: [],
          name: '低风险',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        }]
      },
       {
        type: 'pie',
        radius: ['32%', '34%'],
        hoverAnimation: false,
        label:{normal:{show:false}},
        data:[{name:'',value:1,itemStyle:{normal:{color:'#394a56'}},tooltip: {show:false}}],
       },
       {
        type: 'pie',
        radius: ['66%', '68%'],
        hoverAnimation: false,
        label:{normal:{show:false}},
        data:[{name:'',value:1,itemStyle:{normal:{color:'#394a56'}},tooltip: {show:false}}],
      }
    ]

};

//主机漏洞
var Echaroption34 = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series: [
       {
        type: 'pie',
        hoverAnimation: false,
        data: [],
        center:['50%','50%'],
        radius: ['42%', '58%'],
        itemStyle: {
          normal: {
            color: 'rgba(255,255,255,0)',
            borderColor:'#000',
            borderWidth: 3,
            opacity: 1
          }
        },
        label: {
          normal: {
            show: false,
            position: 'inside'
          }
        }
      },
       {
        name: '风险',
        type: 'pie',
        //     selectedMode: 'single',
        hoverAnimation: true,
        zlevel: 2,
        radius: ['42%', '58%'],
        center:['50%','50%'],
        label: {
          normal: {
            show: false,
            position: 'inner',
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
          value: [],
          name: '紧急',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        },
          {
          value: [],
          name: '高风险',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        },
          {
          value: [],
          name: '中风险',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        },
          {
          value: [],
          name: '低风险',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        }]
      },
       {
        type: 'pie',
        radius: ['32%', '34%'],
        hoverAnimation: false,
        label:{normal:{show:false}},
        data:[{name:'',value:1,itemStyle:{normal:{color:'#394a56'}},tooltip: {show:false}}],
       },
       {
        type: 'pie',
        radius: ['66%', '68%'],
        hoverAnimation: false,
        label:{normal:{show:false}},
        data:[{name:'',value:1,itemStyle:{normal:{color:'#394a56'}},tooltip: {show:false}}],
      }
      ]

};

//弱口令
var Echaroption35 = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  series: [
       {
        type: 'pie',
        hoverAnimation: false,
        data: [],
        center:['50%','50%'],
        radius: ['42%', '58%'],
        itemStyle: {
          normal: {
            color: 'rgba(255,255,255,0)',
            borderColor:'#000',
            borderWidth: 3,
            opacity: 1
          }
        },
        label: {
          normal: {
            show: false,
            position: 'inside'
          }
        }
      },
       {
        name: '风险',
        type: 'pie',
        //     selectedMode: 'single',
        hoverAnimation: true,
        zlevel: 2,
        radius: ['42%', '58%'],
        center:['50%','50%'],
        label: {
          normal: {
            show: false,
            position: 'inner',
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
          value: [],
          name: '紧急',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        },
          {
          value: [],
          name: '高风险',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        },
          {
          value: [],
          name: '中风险',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        },
          {
          value: [],
          name: '低风险',
          itemStyle: {
            normal: {
              color: [],
              opacity: 0.5,
            }
          },
          tooltip: {
             show:true
          },
        }]
      },
       {
        type: 'pie',
        radius: ['32%', '34%'],
        hoverAnimation: false,
        label:{normal:{show:false}},
        data:[{name:'',value:1,itemStyle:{normal:{color:'#394a56'}},tooltip: {show:false}}],
       },
       {
        type: 'pie',
        radius: ['66%', '68%'],
        hoverAnimation: false,
        label:{normal:{show:false}},
        data:[{name:'',value:1,itemStyle:{normal:{color:'#394a56'}},tooltip: {show:false}}],
      }
      ]

};

/************Web漏洞、主机漏洞、弱口令柱状图****************/
var Echaroption5 = {
  color: ['#0a6388'],
    tooltip : {
        trigger: 'axis',
        formatter: "{b} :{c} ",
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
      top:'10',
        left: '2%',
        right: '18%',
        bottom: '0',
        containLabel: true
    },
    yAxis : {
            type : 'category',
            data : ['信息泄露', '代码执行', '木马上传', '跨站脚本', 'SQL注入'],
            axisTick: { show:false},
            axisLabel: {
              formatter: function (val) {
          return (val.length > 4 ? (val.slice(0,3)+"...") : val );
        },
              textStyle:{
                fontSize:14,
                color:'rgba(255,255,255,0.8)'}
          },
          axisLine:{
            show:false,
            lineStyle:{
              color:'rgba(255,255,255,0.2)'
            }
          },
        },
    xAxis : { show :false,},
    series : [
        {
            name:'',
            type:'bar',
            barWidth: '40%',
            //bargap:30,
            stack: '总量',
            z: 3,
            data:[],
            itemStyle: {
              normal: {
               barBorderRadius:[2,2,0,0],
               color: {image: [],repeat: 'repeat'}
              }
          },
            label:{
              normal:{
                show:true,
                position:[240,0],
                textStyle:{
                  fontSize:14,
                  fontFamily:'ElementalEnd',
                  color:'#23ffff'
                }
              }
            }
        },
    {
      name:'占位',
      type: 'bar',
      barWidth:'40%',
      barGap:'-100%',
      itemStyle: {
        normal: {
         barBorderRadius:[2,2,0,0],
         color: {image: [],repeat: 'repeat'}
        }
      },
      data: [],
    },
    ]
};
var Echaroption6 = {
  color: ['#0a6388'],
  tooltip : {
      trigger: 'axis',
      formatter: "{b} :{c} ",
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
  },
  grid: {
    top:'10',
      left: '2%',
      right: '19%',
      bottom: '0',
      containLabel: true
  },
  yAxis : {
          type : 'category',
          data : ['DNS', '数据库后台', 'Web服务器', '网络设备', '溢出'],
          axisTick: { show:false},
          axisLabel: {
            formatter: function (val) {
        return (val.length > 4 ? (val.slice(0,3)+"...") : val );
      },
            textStyle:{
              fontSize:14,
              color:'rgba(255,255,255,0.8)'}
        },
        axisLine:{
          show:false,
          lineStyle:{
            color:'rgba(255,255,255,0.2)'
          }
        },

      },
  xAxis : { show :false,},
  series : [
      {
          name:'',
          type:'bar',
          barWidth: '40%',
          //bargap:30,
          stack: '总量',
          z: 3,
          data:[],
          itemStyle: {
            normal: {
             barBorderRadius:[2,2,0,0],
           color: {image: [],repeat: 'repeat'}
           }
            },
          label:{
            normal:{
              show:true,
              position:[240,0],
              textStyle:{
                fontSize:14,
                fontFamily:'ElementalEnd',
                color:'#23ffff'
              }
            }
          }
        },
    {
      name:'占位',
      type: 'bar',
      barWidth:'40%',
      barGap:'-100%',
      silent:true,
      itemStyle: {
        normal: {
         barBorderRadius:[2,2,0,0],
         color: {image: [],repeat: 'repeat'}
        }
      },
      data: [],
    },
  ]
};
var Echaroption7 = {
  color: ['#0a6388'],
  tooltip : {
      trigger: 'axis',
      formatter: "{b} :{c} ",
      axisPointer : {type : 'shadow'}
  },
  grid: {
    top:'10',
      left: '2%',
      right: '19%',
      bottom: '0',
      containLabel: true
  },
  yAxis : {
          type : 'category',
          data : ['地方税务局', '生产监督中心', '科学技术中心', '地方税务局', '古镇景德镇'],
          axisTick: { show:false},
          axisLabel: {
            formatter: function (val) {
        return (val.length > 4 ? (val.slice(0,3)+"...") : val );
      },
            textStyle:{
              fontSize:14,
              color:'rgba(255,255,255,0.8)'}
        },
        axisLine:{
          show:false,
          lineStyle:{color:'rgba(255,255,255,0.2)'}
        },

      },
  xAxis : { show :false,},
  series : [
      {
          name:'',
          type:'bar',
          barWidth: '40%',
          stack: '总量',
          z: 3,
          data:[],
          itemStyle: {
      normal: {
       barBorderRadius:[2,2,0,0],
       color: {image: [],repeat: 'repeat'}
       }
            },
          label:{
            normal:{
              show:true,
              position:[240,0],
              textStyle:{
                fontSize:14,
                fontFamily:'ElementalEnd',
                color:'#23ffff'
              }
            }
          }
      },
  {
    name:'占位',
    type: 'bar',
    barWidth:'40%',
    barGap:'-100%',//柱间距离 ,-100%柱子重叠，最后一个生效
    itemStyle: {
      normal: {
       barBorderRadius:[2,2,0,0],
       color: {image: [],repeat: 'repeat'}
      }
    },
    data: [],
  },
  ]
};


/************域名监控****************/
var Echaroption4 = {
  tooltip:{},
  grid:{
    show:false,
    top:10,
    left:20,
    right:20,
    bottom:20,
    containLabel:true,
  },
  xAxis : [
    {
      type : 'category',
      data:[],
      splitLine: {show: false},
      axisLine: {show: false},
        axisLabel: {
              formatter: function (val) {
          return (val.length > 4 ? (val.slice(0,3)+"...") : val );
        },
              textStyle:{
                fontSize:12,
                color:'rgba(255,255,255,0.7)'}
          },
      axisTick:{show: false},
    }
  ],
  yAxis : [
    {
      type : 'value',
      splitLine: {
        show: true,
        lineStyle:{ //分割线颜色，可设单个，也可以设置数组。
          color:'#202f41',
        },
      },
      axisLine: {
        show: false
      },
      axisTick:{
        show: false
      },
      axisLabel:{
        textStyle:{
          color:'rgba(255,255,255,0.7)',
          fontFamily:"ElementalEnd"
        }
      },
    }
  ],
  series : [
    {
      type:'bar',
      height:'100%',
      barWidth:'40%',
      data:[],
      itemStyle: {
        normal: {
        color: {
           image: [],
           repeat: 'repeat'
         }
        }
      }
    },
  ]
};

//地图
var Echaroption12 = {
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
            return params.name + ' : ' + params.value[2];
        }
  },
  geo: {
    map: [],
    roam:true,
    top:'1%',
    left:'15%',
    label: {
      normal:{
        show:false,
      },
      emphasis: {
        show: false,
      }
    },
    itemStyle: {
      normal: {
        areaColor: '#eaff00',
      },
    }
  },
  series: [{
    name: '被劫持数:',
    type: 'scatter',
    coordinateSystem: 'geo',
    symbolSize: 7,
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      normal:{
        color:'#f34336',
      },
      emphasis: {
        color:'#f34336',
        borderColor: '#fff',
        borderWidth: 1
      }
    }
  }]
};
/****************脆弱性关联-关系图********************/
var Echargraphdata = [
  {category:0, name: '漏洞', value : 15,symbolSize:30},
  {category:0, name: '漏洞1', value : 6,symbolSize:12},
  {category:0, name: '漏洞2', value : 8,symbolSize:16},
  {category:0, name: '漏洞3', value : 5,symbolSize:10},
  {category:0, name: '漏洞4', value : 4,symbolSize:8},
  {category:0, name: '漏洞5', value : 3,symbolSize:6},
  {category:0, name: '漏洞6', value : 4,symbolSize:8},
  {category:0, name: '漏洞7', value : 7,symbolSize:14},
  {category:0, name: '漏洞b', value : 5,symbolSize:10},
  {category:0, name: '漏洞c', value : 5,symbolSize:10},
  {category:0, name: '漏洞d', value : 5,symbolSize:10},
  {category:0, name: '漏洞e', value : 5,symbolSize:10},
  {category:0, name: '漏洞f', value : 5,symbolSize:10},
  {category:0, name: '漏洞g', value : 5,symbolSize:10},
  {category:0, name: '漏洞h', value : 5,symbolSize:10},
  {category:1, name: '端口', value : 15,symbolSize:30},
  {category:1, name: '端口1', value : 6,symbolSize:12},
  {category:1, name: '端口2', value : 8,symbolSize:16},
  {category:1, name: '端口3', value : 5,symbolSize:10},
  {category:1, name: '端口4', value : 4,symbolSize:8},
  {category:1, name: '端口5', value : 3,symbolSize:6},
  {category:1, name: '端口6', value : 4,symbolSize:8},
  {category:0, name: '漏洞8', value : 9,symbolSize:18},
  {category:0, name: '漏洞9', value : 6,symbolSize:12},
  {category:0, name: '漏洞a', value : 5,symbolSize:10},
  {category:1, name: '端口7', value : 7,symbolSize:14},
  {category:1, name: '端口8', value : 9,symbolSize:18},
  {category:1, name: '端口9', value : 6,symbolSize:12},
  {category:1, name: '端口a', value : 5,symbolSize:10},
  {category:1, name: '端口b', value : 5,symbolSize:10},
  {category:1, name: '端口c', value : 5,symbolSize:10},
  {category:2, name: '服务', value : 10,symbolSize:20},
  {category:2, name: '服务1', value : 6,symbolSize:12},
  {category:2, name: '服务2', value : 8,symbolSize:16},
  {category:2, name: '服务3', value : 2,symbolSize:4},
  {category:2, name: '服务4', value : 3,symbolSize:6},
  {category:2, name: '服务5', value : 3,symbolSize:6},
  {category:2, name: '服务6', value : 4,symbolSize:8},
  {category:2, name: '服务7', value : 2,symbolSize:4},
  {category:2, name: '服务8', value : 2,symbolSize:4},
  {category:3, name: '主机', value : 20,symbolSize:40},
  {category:3, name: '主机1', value : 5,symbolSize:10},
  {category:3, name: '主机2', value : 3,symbolSize:6},
  {category:3, name: '主机3', value : 5,symbolSize:10},
  {category:3, name: '主机4', value : 4,symbolSize:8},
  {category:3, name: '主机5', value : 3,symbolSize:6}

];
var Echaroption22 = {
  color: ['#7dfb7a', '#fec007', '#23ffff', '#2195f2'],
  tooltip: {
    trigger: 'item',
  },
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [{
    type: 'graph',
    name: "脆弱性关联",
    layout: 'circular',

    categories: [
      {name: '漏洞'},
      {name: '端口'},
      {name: '服务'},
      {name: '主机'}
    ],
    data: [],
    links: [],
    roam: true,
    label: {
      normal: {
        position: 'right',
        formatter: '{b}'
      }
    },
    lineStyle: {
      normal: {
        //color:'#99e6f7',
        type:'solid' ,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(60,103,121,1)' // 0% 处的颜色
          }, {
            offset: 0.5,
            color: 'rgba(60,103,121,0.7)' // 50% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(60,103,121,1)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },

        curveness: 0.3
      }
    }

  }]
};

/***********脆弱关系柱状图****************/
var Echarreldata = [
   {value:17,itemStyle: {normal: {barBorderRadius:[2,2,0,0], color: {image: [],repeat: 'repeat'}}}},
   {value:25,itemStyle: {normal: {barBorderRadius:[2,2,0,0], color: {image: [],repeat: 'repeat'}}}},
   {value:38,itemStyle: {normal: {barBorderRadius:[2,2,0,0], color: {image: [],repeat: 'repeat'}}}},
   {value:0,itemStyle: {normal: {barBorderRadius:[2,2,0,0], color: {image: [],repeat: 'repeat'}}}}
];
var Echaroption8 = {
  color: ['#0a6388'],
  tooltip : {
      trigger: 'axis',
      formatter: "{b} :{c} ",
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
  },
  grid: {
    top:'20%',
      left: '2%',
      right: '20%',
      bottom: '10%',
      containLabel: true
  },
  yAxis : {
          type : 'category',
          data : ['主机总数', '服务总数', '端口总数', '漏洞总数'],
          axisTick: { show:false},
          axisLabel: {
            formatter: function (val) {
        return (val.length > 4 ? (val.slice(0,3)+"...") : val );
      },
            textStyle:{
              fontSize:14,
              color:'rgba(255,255,255,0.8)'}
        },
        axisLine:{
          show:false,
          lineStyle:{
            color:'rgba(255,255,255,0.2)'
          }
        },

      },
  xAxis : { show :false,},
  series : [
      {
          name:'',
          type:'bar',
          barWidth: '35%',
         // bargap:30,
          stack: '总量',
          z: 3,
          data: [],
          label:{
            normal:{
              show:true,
              position:[240,0],
              textStyle:{
                fontSize:14,
                fontFamily:'ElementalEnd',
                color:'#23ffff'
              }
            }
          }
      },
      {
        name:'占位',
        type: 'bar',
        barWidth:'35%',
        barGap:'-100%',
        itemStyle: {
          normal: {
           barBorderRadius:[2,2,0,0],
           color: {image: [],repeat: 'repeat'}
          }
        },
        data: [],
      },
     ]
   };

export {
  EcharPatternSrc,
  EcharbluePatternSrc,
  EchargreenPatternSrc,
  EcharyellowPatternSrc,
  EcharskybluePatternSrc,
  EcharPatternSrc2,
  Echarbaselabels,
  Echaroption15,
  Echaroption2,
  Echaroption3,
  Echaroption33,
  Echaroption34,
  Echaroption35,
  Echaroption5,
  Echaroption6,
  Echaroption7,
  Echaroption4,
  Echaroption12,
  Echargraphdata,
  Echaroption22,
  Echarreldata,
  Echaroption8,
}

// Quill commit e5681e3af4fa533cfbac9db449a3b57c4eecfd33
"use strict"

HTMLElement.prototype.$ = function(selector) {
    return window.$(selector, this)
}
DocumentFragment.prototype.$ = function(selector) {
    return window.$(selector, this)
}
window.$ = function(selector, el = document) {
    if(selector[0] === "#" || selector.includes("[name")) {
        return el.querySelector(selector)
    } else {
        return el.querySelectorAll(selector);
    }
}

HTMLElement.prototype.html = function (...newNodes) {
    this.innerHTML = "";
    this.append(...newNodes)
}

HTMLElement.prototype.addAttribute = function(name) {
    this.setAttribute(name, "")
}

HTMLElement.prototype.ownHTML = function() {
    return this.startingTag() + this.endingTag()
}

HTMLElement.prototype.startingTag = function() {
    const tag = this.tagName.toLowerCase();
    let html = `<${tag}`;

    for (const attr of this.attributes) {
        html += ` ${attr.name}="${attr.value}"`;
    }

    html += `>`;
    return html;
}

HTMLElement.prototype.endingTag = function() {
    const tag = this.tagName.toLowerCase();
    return `</${tag}>`;
}

window.css = function css(cssString) {
    let container = document.querySelector("style#pageStyle");
    if(!container) {
        container = document.createElement('style');
        container.id = "pageStyle";
        document.head.appendChild(container);
    }
  
    let primarySelector = cssString.substring(0, cssString.indexOf("{")).trim();
    primarySelector = primarySelector.replace(/\*/g, "all");
    primarySelector = primarySelector.replace(/#/g, "id-");
    primarySelector = primarySelector.replace(/,/g, "");
    let stylesheet = container.querySelector(`:scope > style[id='${primarySelector}']`)
    if(!stylesheet) {
        stylesheet = document.createElement('style');
        stylesheet.id = primarySelector;
        stylesheet.appendChild(document.createTextNode(cssString));
        container.appendChild(stylesheet);
    } else {
        stylesheet.innerText = cssString
    }
}

window.html = function html(htmlString) {
    let container = document.createElement('div');
    container.innerHTML = htmlString;

    // If there's only one child, return it directly
    if (container.children.length === 1) {
        return container.children[0];
    }

    // If there are multiple children, use a DocumentFragment
    let fragment = document.createDocumentFragment();
    while (container.firstChild) {
        fragment.appendChild(container.firstChild);
    }

    return fragment;
};

function detectMobile() {
    const mobileDeviceRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileDeviceRegex.test(navigator.userAgent);
}
  
function getSafariVersion() {
    const userAgent = navigator.userAgent;
    const isSafari = userAgent.includes("Safari") && !userAgent.includes("Chrome");
    if (isSafari) {
      const safariVersionMatch = userAgent.match(/Version\/(\d+\.\d+)/);
      const safariVersion = safariVersionMatch ? parseFloat(safariVersionMatch[1]) : null;
      return safariVersion;
    }
}

/* ELEMENTS */

window.a = function a({ href, name=href } = {}) {
    let link = document.createElement("a")
    link.setAttribute('href', href);
    link.innerText = name
    return link
}

window.img = function img(src, width="", height="") {
    let image = document.createElement("img")

    if(!src || !(typeof src==="string")) {
        throw new Error("img: missing first argument: src | String")
    } else {
        image.src = src
    }
    if(width && typeof width === "string") {
        image.style.width = width
    } else if(width) {
        image.style.width = width + "px"
    }
    if(height && typeof height === "string") {
        image.style.height = height
    } else if(height) {
        image.style.height = height + "px"
    }
    return image
}

window.p = function p(innerText) {
    let para = document.createElement("p")
    para.innerText = innerText
    return para
}

window.h1 = function h1(innerText) {
    let header = document.createElement("h1")
    header.innerText = innerText
    return header
}

window.h2 = function h2(innerText) {
    let header = document.createElement("h2")
    header.innerText = innerText
    return header
}

window.h3 = function h3(innerText) {
    let header = document.createElement("h3")
    header.innerText = innerText
    return header
}

window.div = function (innerText) {
    let div = document.createElement("div")
    div.innerText = innerText ?? ""
    return div
}

window.span = function (innerText) {
    let span = document.createElement("span")
    span.innerText = innerText
    return span
}

/* CSS */

let allStyleProps = ["accentColor", "additiveSymbols", "alignContent", "alignItems", "alignSelf", "alignmentBaseline", "all", "animation", "animationComposition", "animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationRange", "animationRangeEnd", "animationRangeStart", "animationTimeline", "animationTimingFunction", "appRegion", "appearance", "ascentOverride", "aspectRatio", "backdropFilter", "backfaceVisibility", "background", "backgroundAttachment", "backgroundBlendMode", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPosition", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize", "basePalette", "baselineShift", "baselineSource", "blockSize", "border", "borderBlock", "borderBlockColor", "borderBlockEnd", "borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth", "borderBlockStart", "borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth", "borderBlockStyle", "borderBlockWidth", "borderBottom", "borderBottomColor", "borderBottomLeftRadius", "borderBottomRightRadius", "borderBottomStyle", "borderBottomWidth", "borderCollapse", "borderColor", "borderEndEndRadius", "borderEndStartRadius", "borderImage", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderInline", "borderInlineColor", "borderInlineEnd", "borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth", "borderInlineStart", "borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth", "borderInlineStyle", "borderInlineWidth", "borderLeft", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRadius", "borderRight", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderSpacing", "borderStartEndRadius", "borderStartStartRadius", "borderStyle", "borderTop", "borderTopColor", "borderTopLeftRadius", "borderTopRightRadius", "borderTopStyle", "borderTopWidth", "borderWidth", "bottom", "boxShadow", "boxSizing", "breakAfter", "breakBefore", "breakInside", "bufferedRendering", "captionSide", "caretColor", "clear", "clip", "clipPath", "clipRule", "color", "colorInterpolation", "colorInterpolationFilters", "colorRendering", "colorScheme", "columnCount", "columnFill", "columnGap", "columnRule", "columnRuleColor", "columnRuleStyle", "columnRuleWidth", "columnSpan", "columnWidth", "columns", "contain", "containIntrinsicBlockSize", "containIntrinsicHeight", "containIntrinsicInlineSize", "containIntrinsicSize", "containIntrinsicWidth", "container", "containerName", "containerType", "content", "contentVisibility", "counterIncrement", "counterReset", "counterSet", "cursor", "cx", "cy", "d", "descentOverride", "direction", "display", "dominantBaseline", "emptyCells", "fallback", "fieldSizing", "fill", "fillOpacity", "fillRule", "filter", "flex", "flexBasis", "flexDirection", "flexFlow", "flexGrow", "flexShrink", "flexWrap", "float", "floodColor", "floodOpacity", "font", "fontDisplay", "fontFamily", "fontFeatureSettings", "fontKerning", "fontOpticalSizing", "fontPalette", "fontSize", "fontStretch", "fontStyle", "fontSynthesis", "fontSynthesisSmallCaps", "fontSynthesisStyle", "fontSynthesisWeight", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontVariationSettings", "fontWeight", "forcedColorAdjust", "gap", "grid", "gridArea", "gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridColumn", "gridColumnEnd", "gridColumnGap", "gridColumnStart", "gridGap", "gridRow", "gridRowEnd", "gridRowGap", "gridRowStart", "gridTemplate", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows", "height", "hyphenateCharacter", "hyphenateLimitChars", "hyphens", "imageOrientation", "imageRendering", "inherits", "initialLetter", "initialValue", "inlineSize", "inset", "insetBlock", "insetBlockEnd", "insetBlockStart", "insetInline", "insetInlineEnd", "insetInlineStart", "isolation", "justifyContent", "justifyItems", "justifySelf", "left", "letterSpacing", "lightingColor", "lineBreak", "lineGapOverride", "lineHeight", "listStyle", "listStyleImage", "listStylePosition", "listStyleType", "margin", "marginBlock", "marginBlockEnd", "marginBlockStart", "marginBottom", "marginInline", "marginInlineEnd", "marginInlineStart", "marginLeft", "marginRight", "marginTop", "marker", "markerEnd", "markerMid", "markerStart", "mask", "maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPosition", "maskRepeat", "maskSize", "maskType", "mathDepth", "mathShift", "mathStyle", "maxBlockSize", "maxHeight", "maxInlineSize", "maxWidth", "minBlockSize", "minHeight", "minInlineSize", "minWidth", "mixBlendMode", "negative", "objectFit", "objectPosition", "objectViewBox", "offset", "offsetAnchor", "offsetDistance", "offsetPath", "offsetPosition", "offsetRotate", "opacity", "order", "orphans", "outline", "outlineColor", "outlineOffset", "outlineStyle", "outlineWidth", "overflow", "overflowAnchor", "overflowClipMargin", "overflowWrap", "overflowX", "overflowY", "overlay", "overrideColors", "overscrollBehavior", "overscrollBehaviorBlock", "overscrollBehaviorInline", "overscrollBehaviorX", "overscrollBehaviorY", "pad", "padding", "paddingBlock", "paddingBlockEnd", "paddingBlockStart", "paddingBottom", "paddingInline", "paddingInlineEnd", "paddingInlineStart", "paddingLeft", "paddingRight", "paddingTop", "page", "pageBreakAfter", "pageBreakBefore", "pageBreakInside", "pageOrientation", "paintOrder", "perspective", "perspectiveOrigin", "placeContent", "placeItems", "placeSelf", "pointerEvents", "position", "quotes", "r", "range", "resize", "right", "rotate", "rowGap", "rubyPosition", "rx", "ry", "scale", "scrollBehavior", "scrollMargin", "scrollMarginBlock", "scrollMarginBlockEnd", "scrollMarginBlockStart", "scrollMarginBottom", "scrollMarginInline", "scrollMarginInlineEnd", "scrollMarginInlineStart", "scrollMarginLeft", "scrollMarginRight", "scrollMarginTop", "scrollPadding", "scrollPaddingBlock", "scrollPaddingBlockEnd", "scrollPaddingBlockStart", "scrollPaddingBottom", "scrollPaddingInline", "scrollPaddingInlineEnd", "scrollPaddingInlineStart", "scrollPaddingLeft", "scrollPaddingRight", "scrollPaddingTop", "scrollSnapAlign", "scrollSnapStop", "scrollSnapType", "scrollTimeline", "scrollTimelineAxis", "scrollTimelineName", "scrollbarColor", "scrollbarGutter", "scrollbarWidth", "shapeImageThreshold", "shapeMargin", "shapeOutside", "shapeRendering", "size", "sizeAdjust", "speak", "speakAs", "src", "stopColor", "stopOpacity", "stroke", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "suffix", "symbols", "syntax", "system", "tabSize", "tableLayout", "textAlign", "textAlignLast", "textAnchor", "textCombineUpright", "textDecoration", "textDecorationColor", "textDecorationLine", "textDecorationSkipInk", "textDecorationStyle", "textDecorationThickness", "textEmphasis", "textEmphasisColor", "textEmphasisPosition", "textEmphasisStyle", "textIndent", "textOrientation", "textOverflow", "textRendering", "textShadow", "textSizeAdjust", "textSpacingTrim", "textTransform", "textUnderlineOffset", "textUnderlinePosition", "textWrap", "timelineScope", "top", "touchAction", "transform", "transformBox", "transformOrigin", "transformStyle", "transition", "transitionBehavior", "transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction", "translate", "unicodeBidi", "unicodeRange", "userSelect", "vectorEffect", "verticalAlign", "viewTimeline", "viewTimelineAxis", "viewTimelineInset", "viewTimelineName", "viewTransitionName", "visibility", "webkitAlignContent", "webkitAlignItems", "webkitAlignSelf", "webkitAnimation", "webkitAnimationDelay", "webkitAnimationDirection", "webkitAnimationDuration", "webkitAnimationFillMode", "webkitAnimationIterationCount", "webkitAnimationName", "webkitAnimationPlayState", "webkitAnimationTimingFunction", "webkitAppRegion", "webkitAppearance", "webkitBackfaceVisibility", "webkitBackgroundClip", "webkitBackgroundOrigin", "webkitBackgroundSize", "webkitBorderAfter", "webkitBorderAfterColor", "webkitBorderAfterStyle", "webkitBorderAfterWidth", "webkitBorderBefore", "webkitBorderBeforeColor", "webkitBorderBeforeStyle", "webkitBorderBeforeWidth", "webkitBorderBottomLeftRadius", "webkitBorderBottomRightRadius", "webkitBorderEnd", "webkitBorderEndColor", "webkitBorderEndStyle", "webkitBorderEndWidth", "webkitBorderHorizontalSpacing", "webkitBorderImage", "webkitBorderRadius", "webkitBorderStart", "webkitBorderStartColor", "webkitBorderStartStyle", "webkitBorderStartWidth", "webkitBorderTopLeftRadius", "webkitBorderTopRightRadius", "webkitBorderVerticalSpacing", "webkitBoxAlign", "webkitBoxDecorationBreak", "webkitBoxDirection", "webkitBoxFlex", "webkitBoxOrdinalGroup", "webkitBoxOrient", "webkitBoxPack", "webkitBoxReflect", "webkitBoxShadow", "webkitBoxSizing", "webkitClipPath", "webkitColumnBreakAfter", "webkitColumnBreakBefore", "webkitColumnBreakInside", "webkitColumnCount", "webkitColumnGap", "webkitColumnRule", "webkitColumnRuleColor", "webkitColumnRuleStyle", "webkitColumnRuleWidth", "webkitColumnSpan", "webkitColumnWidth", "webkitColumns", "webkitFilter", "webkitFlex", "webkitFlexBasis", "webkitFlexDirection", "webkitFlexFlow", "webkitFlexGrow", "webkitFlexShrink", "webkitFlexWrap", "webkitFontFeatureSettings", "webkitFontSmoothing", "webkitHyphenateCharacter", "webkitJustifyContent", "webkitLineBreak", "webkitLineClamp", "webkitLocale", "webkitLogicalHeight", "webkitLogicalWidth", "webkitMarginAfter", "webkitMarginBefore", "webkitMarginEnd", "webkitMarginStart", "webkitMask", "webkitMaskBoxImage", "webkitMaskBoxImageOutset", "webkitMaskBoxImageRepeat", "webkitMaskBoxImageSlice", "webkitMaskBoxImageSource", "webkitMaskBoxImageWidth", "webkitMaskClip", "webkitMaskComposite", "webkitMaskImage", "webkitMaskOrigin", "webkitMaskPosition", "webkitMaskPositionX", "webkitMaskPositionY", "webkitMaskRepeat", "webkitMaskSize", "webkitMaxLogicalHeight", "webkitMaxLogicalWidth", "webkitMinLogicalHeight", "webkitMinLogicalWidth", "webkitOpacity", "webkitOrder", "webkitPaddingAfter", "webkitPaddingBefore", "webkitPaddingEnd", "webkitPaddingStart", "webkitPerspective", "webkitPerspectiveOrigin", "webkitPerspectiveOriginX", "webkitPerspectiveOriginY", "webkitPrintColorAdjust", "webkitRtlOrdering", "webkitRubyPosition", "webkitShapeImageThreshold", "webkitShapeMargin", "webkitShapeOutside", "webkitTapHighlightColor", "webkitTextCombine", "webkitTextDecorationsInEffect", "webkitTextEmphasis", "webkitTextEmphasisColor", "webkitTextEmphasisPosition", "webkitTextEmphasisStyle", "webkitTextFillColor", "webkitTextOrientation", "webkitTextSecurity", "webkitTextSizeAdjust", "webkitTextStroke", "webkitTextStrokeColor", "webkitTextStrokeWidth", "webkitTransform", "webkitTransformOrigin", "webkitTransformOriginX", "webkitTransformOriginY", "webkitTransformOriginZ", "webkitTransformStyle", "webkitTransition", "webkitTransitionDelay", "webkitTransitionDuration", "webkitTransitionProperty", "webkitTransitionTimingFunction", "webkitUserDrag", "webkitUserModify", "webkitUserSelect", "webkitWritingMode", "whiteSpace", "whiteSpaceCollapse", "widows", "width", "willChange", "wordBreak", "wordSpacing", "wordWrap", "writingMode", "x", "y", "zIndex", "zoom"]
function extendHTMLElementWithStyleSetters() {
    allStyleProps.forEach(prop => {
        if(prop === "translate") return
        HTMLElement.prototype[prop] = function(value) {
            this.style[prop] = value;
            return this;
        };
    });
}
extendHTMLElementWithStyleSetters();

HTMLElement.prototype.padding = function(direction, value) {
    if(!value) {
        this.style.padding = direction;
    }

    const directionName = `padding${direction.charAt(0).toUpperCase()}${direction.slice(1)}`;
    if (typeof value === 'number') {
        this.style[directionName] = `${value}px`;
    } else {
        this.style[directionName] = value;
    }
    return this
}

    HTMLElement.prototype.paddingTop = function(value, unit = "px") {
        this.style.paddingTop = value + unit
        return this
    }

    HTMLElement.prototype.paddingLeft = function(value, unit = "px") {
        this.style.paddingLeft = value + unit
        return this
    }

    HTMLElement.prototype.paddingBottom = function(value, unit = "px") {
        this.style.paddingBottom = value + unit
        return this
    }

    HTMLElement.prototype.paddingRight = function(value, unit = "px") {
        this.style.paddingRight = value + unit
        return this
    }

HTMLElement.prototype.margin = function(value, unit = "px") {
    this.style.margin = value + unit
    return this
}

    HTMLElement.prototype.marginTop = function(value, unit = "px") {
        this.style.marginTop = value + unit
        return this
    }

    HTMLElement.prototype.marginLeft = function(value, unit = "px") {
        this.style.marginLeft = value + unit
        return this
    }

    HTMLElement.prototype.marginBottom = function(value, unit = "px") {
        this.style.marginBottom = value + unit
        return this
    }

    HTMLElement.prototype.marginRight = function(value, unit = "px") {
        this.style.marginRight = value + unit
        return this
    }

HTMLElement.prototype.width = function(value, unit = "px") {
    if (typeof value === 'number') {
        this.style.width = `${value}` + unit;
    } else {
        console.error("Width: gotta be a number bro")
    }
    return this
}

HTMLElement.prototype.height = function(value, unit = "px") {
    if (typeof value === 'number') {
        this.style.height = `${value}` + unit;
    } else {
        console.error("Height: gotta be a number bro")
    }
    return this
}

HTMLElement.prototype.fontSize = function(value, unit = "px") {
    if (typeof value === 'number') {
        this.style.fontSize = `${value}` + unit;
    } else {
        console.error("Font Size: gotta be a number bro")
    }
    return this
}

function checkStyle(el) {
    let computed = window.getComputedStyle(el).position
    if(!(computed === "absolute" || computed === "fixed")) {
        el.style.position = "absolute"
    }
}

HTMLElement.prototype.x = function(value, unit = "px") {
    if (typeof value !== 'number' || isNaN(value))
        throw new Error(`Invalid value: ${value}. Expected a number.`);
    checkStyle(this)
    this.style.left = value + unit
    return this
}

HTMLElement.prototype.y = function(value, unit = "px") {
    if (typeof value !== 'number' || isNaN(value))
        throw new Error(`Invalid value: ${value}. Expected a number.`);
    checkStyle(this)
    this.style.top = value + unit
    return this
}

HTMLElement.prototype.xRight = function(value, unit = "px") {
    if (typeof value !== 'number' || isNaN(value))
        throw new Error(`Invalid value: ${value}. Expected a number.`);
    checkStyle(this)
    this.style.right = value + unit
    return this
}

HTMLElement.prototype.yBottom = function(value, unit = "px") {
    if (typeof value !== 'number' || isNaN(value))
        throw new Error(`Invalid value: ${value}. Expected a number.`);
    checkStyle(this)
    this.style.bottom = value + unit
    return this
}

HTMLElement.prototype.positionType = function (value) {
    if(!(value === "absolute" || value === "relative" || value === "static" || value === "fixed" || value === "sticky")) {
        console.error("HTMLElement.overlflow: must have valid overflow value!")
        return;
    }
    this.style.position = value
    return this
}

/* PROTOTYPE EVENTS */

HTMLElement.prototype.onAppear = function(func) {
    func(this)
    return this
}
HTMLElement.prototype.onClick = function(func) {
    this.addEventListener("click", func)
    return this
}
HTMLElement.prototype.onMouseDown = function(func) {
    this.addEventListener("mousedown", func)
    return this
}
HTMLElement.prototype.onMouseUp = function(func) {
    this.addEventListener("mouseup", func)
    return this
}
HTMLElement.prototype.onRightClick = function(func) {
    this.addEventListener("contextmenu", func)
    return this
}

HTMLElement.prototype.onHover = function(cb) {
    this.addEventListener("mouseover", () => cb(true))
    this.addEventListener("mouseleave", () => cb(false))
    return this
}
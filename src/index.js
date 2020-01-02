const __internal_VALID_ELEMENT_ID_CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const __internal_ELEMENT_ID_LENGTH = 36

let __internal_elements = () => []

const __internal_generateElementId = () =>
	[...Array(__internal_ELEMENT_ID_LENGTH)]
		.map(() =>
			__internal_VALID_ELEMENT_ID_CHARACTERS.charAt(
				Math.floor(Math.random() * __internal_VALID_ELEMENT_ID_CHARACTERS.length)
			)
		)
		.join('')

const State = {
	increment: __internal_generateElementId(),
	decrement: __internal_generateElementId()
}

const animate = (framesPerSecond, handler) => {
	const handle = setInterval(
		() => handler(() => clearInterval(handle)),
		1000 / framesPerSecond
	)
}

const __internal_animateState = async (key, newValue, duration, framesPerSecond) => {
	const oldValue = state[key]
	const difference = newValue - oldValue
	const frames = duration * framesPerSecond
	const increment = difference / frames
	const frameDuration = 1000 / framesPerSecond
	
	for (let current = oldValue; current < newValue; current += increment)
		await new Promise(resolve =>
			setTimeout(() => {
				state(key, current)
				resolve()
			}, frameDuration)
		)
	
	return Promise.resolve()
}

const animateState = async (object, duration, framesPerSecond = 60) =>
	Promise.all(Object.entries(object).map(([key, value]) =>
		__internal_animateState(key, value, duration, framesPerSecond)
	))

const renderIf = (condition, elements) =>
	condition ? elements : []

const renderToString = elements =>
	[].concat(...elements).reduce((acc, element) =>
		`${acc}${
			typeof element === 'string'
				? element
				: element._render()
		}`
	, '')

const render = elements => {
	__internal_elements = elements
	
	document.body.innerHTML = renderToString(elements())
}

const __internal_setState = obj => {
	if (!Object.keys(obj).length)
		return state
	
	for (const key in obj) {
		const newValue = obj[key]
		
		if (newValue === State.increment) {
			state[key]++
			continue
		}
		
		if (newValue === State.decrement) {
			state[key]--
			continue
		}
		
		state[key] = newValue
	}
	
	render(__internal_elements)
	
	return state
}

class __internal_Element {
	_id
	_name
	_isVoidElement
	_children
	_attributes
	
	constructor(name, isVoidElement = false) {
		this._name = name
		this._isVoidElement = isVoidElement
		this._children = []
		this._attributes = {}
	}
	
	children = elements => {
		this._children = [...this._children, ...elements]
		
		return this
	}
	
	accept = value => {
		this._attributes.accept = value
		
		return this
	}
	
	acceptCharset = value => {
		this._attributes['accept-charset'] = value
		
		return this
	}
	
	accessKey = value => {
		this._attributes.accesskey = value
		
		return this
	}
	
	action = value => {
		this._attributes.action = value
		
		return this
	}
	
	alt = value => {
		this._attributes.alt = value
		
		return this
	}
	
	async = value => {
		this._attributes.async = value
		
		return this
	}
	
	autoComplete = value => {
		this._attributes.autocomplete = value
		
		return this
	}
	
	autoFocus = value => {
		this._attributes.autofocus = value
		
		return this
	}
	
	autoPlay = value => {
		this._attributes.autoplay = value
		
		return this
	}
	
	charset = value => {
		this._attributes.charset = value
		
		return this
	}
	
	checked = value => {
		this._attributes.checked = value
		
		return this
	}
	
	cite = value => {
		this._attributes.cite = value
		
		return this
	}
	
	class = (...values) => {
		this._attributes.class = values.join(' ')
		
		return this
	}
	
	cols = value => {
		this._attributes.cols = value
		
		return this
	}
	
	colSpan = value => {
		this._attributes.colspan = value
		
		return this
	}
	
	content = value => {
		this._attributes.content = value
		
		return this
	}
	
	contentEditable = value => {
		this._attributes.contenteditable = value
		
		return this
	}
	
	controls = value => {
		this._attributes.controls = value
		
		return this
	}
	
	coords = value => {
		this._attributes.coords = value
		
		return this
	}
	
	data = value => {
		this._attributes.data = value
		
		return this
	}
	
	dataWildcard = (extension, value) => {
		this._attributes[`data-${extension}`] = value
		
		return this
	}
	
	dateTime = value => {
		this._attributes.datetime = value
		
		return this
	}
	
	default = value => {
		this._attributes.default = value
		
		return this
	}
	
	defer = value => {
		this._attributes.defer = value
		
		return this
	}
	
	dir = value => {
		this._attributes.dir = value
		
		return this
	}
	
	dirName = value => {
		this._attributes.dirname = value
		
		return this
	}
	
	disabled = value => {
		this._attributes.disabled = value
		
		return this
	}
	
	download = value => {
		this._attributes.download = value
		
		return this
	}
	
	draggable = value => {
		this._attributes.draggable = value
		
		return this
	}
	
	dropZone = value => {
		this._attributes.dropzone = value
		
		return this
	}
	
	encType = value => {
		this._attributes.enctype = value
		
		return this
	}
	
	for = value => {
		this._attributes.for = value
		
		return this
	}
	
	form = value => {
		this._attributes.form = value
		
		return this
	}
	
	formAction = value => {
		this._attributes.formaction = value
		
		return this
	}
	
	headers = value => {
		this._attributes.headers = value
		
		return this
	}
	
	height = value => {
		this._attributes.height = value
		
		return this
	}
	
	hidden = value => {
		this._attributes.hidden = value
		
		return this
	}
	
	high = value => {
		this._attributes.high = value
		
		return this
	}
	
	href = value => {
		this._attributes.href = value
		
		return this
	}
	
	hrefLang = value => {
		this._attributes.hreflang = value
		
		return this
	}
	
	httpEquiv = value => {
		this._attributes['http-equiv'] = value
		
		return this
	}
	
	id = value => {
		this._attributes.id = value
		
		return this
	}
	
	isMap = value => {
		this._attributes.ismap = value
		
		return this
	}
	
	kind = value => {
		this._attributes.kind = value
		
		return this
	}
	
	label = value => {
		this._attributes.label = value
		
		return this
	}
	
	lang = value => {
		this._attributes.lang = value
		
		return this
	}
	
	list = value => {
		this._attributes.list = value
		
		return this
	}
	
	loop = value => {
		this._attributes.loop = value
		
		return this
	}
	
	low = value => {
		this._attributes.low = value
		
		return this
	}
	
	max = value => {
		this._attributes.max = value
		
		return this
	}
	
	maxLength = value => {
		this._attributes.maxlength = value
		
		return this
	}
	
	media = value => {
		this._attributes.media = value
		
		return this
	}
	
	method = value => {
		this._attributes.method = value
		
		return this
	}
	
	min = value => {
		this._attributes.min = value
		
		return this
	}
	
	multiple = value => {
		this._attributes.multiple = value
		
		return this
	}
	
	muted = value => {
		this._attributes.muted = value
		
		return this
	}
	
	name = value => {
		this._attributes.name = value
		
		return this
	}
	
	noValidate = value => {
		this._attributes.novalidate = value
		
		return this
	}
	
	onAbort = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onAbort`
		
		window[callbackName] = callback
		this._attributes.onabort = `${callbackName}()`
		
		return this
	}
	
	onAfterPrint = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onAfterPrint`
		
		window[callbackName] = callback
		this._attributes.onafterprint = `${callbackName}()`
		
		return this
	}
	
	onBeforePrint = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onBeforePrint`
		
		window[callbackName] = callback
		this._attributes.onbeforeprint = `${callbackName}()`
		
		return this
	}
	
	onBeforeUnload = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onBeforeUnload`
		
		window[callbackName] = callback
		this._attributes.onbeforeunload = `${callbackName}()`
		
		return this
	}
	
	onBlur = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onBlur`
		
		window[callbackName] = callback
		this._attributes.onblur = `${callbackName}()`
		
		return this
	}
	
	onCanPlay = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onCanPlay`
		
		window[callbackName] = callback
		this._attributes.oncanplay = `${callbackName}()`
		
		return this
	}
	
	onCanPlayThrough = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onCanPlayThrough`
		
		window[callbackName] = callback
		this._attributes.oncanplaythrough = `${callbackName}()`
		
		return this
	}
	
	onChange = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onChange`
		
		window[callbackName] = callback
		this._attributes.onchange = `${callbackName}()`
		
		return this
	}
	
	onClick = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onClick`
		
		window[callbackName] = callback
		this._attributes.onclick = `${callbackName}()`
		
		return this
	}
	
	onContextMenu = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onContextMenu`
		
		window[callbackName] = callback
		this._attributes.oncontextmenu = `${callbackName}()`
		
		return this
	}
	
	onCopy = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onCopy`
		
		window[callbackName] = callback
		this._attributes.oncopy = `${callbackName}()`
		
		return this
	}
	
	onCueChange = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onCueChange`
		
		window[callbackName] = callback
		this._attributes.oncuechange = `${callbackName}()`
		
		return this
	}
	
	onCut = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onCut`
		
		window[callbackName] = callback
		this._attributes.oncut = `${callbackName}()`
		
		return this
	}
	
	onDoubleClick = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onDoubleClick`
		
		window[callbackName] = callback
		this._attributes.ondblclick = `${callbackName}()`
		
		return this
	}
	
	onDrag = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onDrag`
		
		window[callbackName] = callback
		this._attributes.ondrag = `${callbackName}()`
		
		return this
	}
	
	onDragEnd = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onDragEnd`
		
		window[callbackName] = callback
		this._attributes.ondragend = `${callbackName}()`
		
		return this
	}
	
	onDragEnter = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onDragEnter`
		
		window[callbackName] = callback
		this._attributes.ondragenter = `${callbackName}()`
		
		return this
	}
	
	onDragLeave = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onDragLeave`
		
		window[callbackName] = callback
		this._attributes.ondragleave = `${callbackName}()`
		
		return this
	}
	
	onDragOver = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onDragOver`
		
		window[callbackName] = callback
		this._attributes.ondragover = `${callbackName}()`
		
		return this
	}
	
	onDragStart = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onDragStart`
		
		window[callbackName] = callback
		this._attributes.ondragstart = `${callbackName}()`
		
		return this
	}
	
	onDrop = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onDrop`
		
		window[callbackName] = callback
		this._attributes.ondrop = `${callbackName}()`
		
		return this
	}
	
	onDurationChange = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onDurationChange`
		
		window[callbackName] = callback
		this._attributes.ondurationchange = `${callbackName}()`
		
		return this
	}
	
	onEmptied = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onEmptied`
		
		window[callbackName] = callback
		this._attributes.onemptied = `${callbackName}()`
		
		return this
	}
	
	onEnded = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onEnded`
		
		window[callbackName] = callback
		this._attributes.onended = `${callbackName}()`
		
		return this
	}
	
	onError = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onError`
		
		window[callbackName] = callback
		this._attributes.onerror = `${callbackName}()`
		
		return this
	}
	
	onFocus = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onFocus`
		
		window[callbackName] = callback
		this._attributes.onfocus = `${callbackName}()`
		
		return this
	}
	
	onHashChange = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onHashChange`
		
		window[callbackName] = callback
		this._attributes.onhashchange = `${callbackName}()`
		
		return this
	}
	
	onInput = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onInput`
		
		window[callbackName] = callback
		this._attributes.oninput = `${callbackName}()`
		
		return this
	}
	
	onInvalid = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onInvalid`
		
		window[callbackName] = callback
		this._attributes.oninvalid = `${callbackName}()`
		
		return this
	}
	
	onKeyDown = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onKeyDown`
		
		window[callbackName] = callback
		this._attributes.onkeydown = `${callbackName}()`
		
		return this
	}
	
	onKeyPress = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onKeyPress`
		
		window[callbackName] = callback
		this._attributes.onkeypress = `${callbackName}()`
		
		return this
	}
	
	onKeyUp = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onKeyUp`
		
		window[callbackName] = callback
		this._attributes.onkeyup = `${callbackName}()`
		
		return this
	}
	
	onLoad = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onLoad`
		
		window[callbackName] = callback
		this._attributes.onload = `${callbackName}()`
		
		return this
	}
	
	onLoadedData = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onLoadedData`
		
		window[callbackName] = callback
		this._attributes.onloadeddata = `${callbackName}()`
		
		return this
	}
	
	onLoadedMetadata = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onLoadedMetadata`
		
		window[callbackName] = callback
		this._attributes.onloadedmetadata = `${callbackName}()`
		
		return this
	}
	
	onLoadStart = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onLoadStart`
		
		window[callbackName] = callback
		this._attributes.onloadstart = `${callbackName}()`
		
		return this
	}
	
	onMouseDown = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onMouseDown`
		
		window[callbackName] = callback
		this._attributes.onmousedown = `${callbackName}()`
		
		return this
	}
	
	onMouseMove = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onMouseMove`
		
		window[callbackName] = callback
		this._attributes.onmousemove = `${callbackName}()`
		
		return this
	}
	
	onMouseOut = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onMouseOut`
		
		window[callbackName] = callback
		this._attributes.onmouseout = `${callbackName}()`
		
		return this
	}
	
	onMouseOver = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onMouseOver`
		
		window[callbackName] = callback
		this._attributes.onmouseover = `${callbackName}()`
		
		return this
	}
	
	onMouseUp = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onMouseUp`
		
		window[callbackName] = callback
		this._attributes.onmouseup = `${callbackName}()`
		
		return this
	}
	
	onMouseWheel = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onMouseWheel`
		
		window[callbackName] = callback
		this._attributes.onmousewheel = `${callbackName}()`
		
		return this
	}
	
	onOffline = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onOffline`
		
		window[callbackName] = callback
		this._attributes.onoffline = `${callbackName}()`
		
		return this
	}
	
	onOnline = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onOnline`
		
		window[callbackName] = callback
		this._attributes.ononline = `${callbackName}()`
		
		return this
	}
	
	onPageShow = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onPageShow`
		
		window[callbackName] = callback
		this._attributes.onpageshow = `${callbackName}()`
		
		return this
	}
	
	onPaste = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onPaste`
		
		window[callbackName] = callback
		this._attributes.onpaste = `${callbackName}()`
		
		return this
	}
	
	onPause = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onPause`
		
		window[callbackName] = callback
		this._attributes.onpause = `${callbackName}()`
		
		return this
	}
	
	onPlay = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onPlay`
		
		window[callbackName] = callback
		this._attributes.onplay = `${callbackName}()`
		
		return this
	}
	
	onPlaying = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onPlaying`
		
		window[callbackName] = callback
		this._attributes.onplaying = `${callbackName}()`
		
		return this
	}
	
	onProgress = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onProgress`
		
		window[callbackName] = callback
		this._attributes.onprogress = `${callbackName}()`
		
		return this
	}
	
	onRateChange = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onRateChange`
		
		window[callbackName] = callback
		this._attributes.onratechange = `${callbackName}()`
		
		return this
	}
	
	onReset = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onReset`
		
		window[callbackName] = callback
		this._attributes.onreset = `${callbackName}()`
		
		return this
	}
	
	onResize = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onResize`
		
		window[callbackName] = callback
		this._attributes.onresize = `${callbackName}()`
		
		return this
	}
	
	onScroll = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onScroll`
		
		window[callbackName] = callback
		this._attributes.onscroll = `${callbackName}()`
		
		return this
	}
	
	onSearch = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onSearch`
		
		window[callbackName] = callback
		this._attributes.onsearch = `${callbackName}()`
		
		return this
	}
	
	onSeeked = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onSeeked`
		
		window[callbackName] = callback
		this._attributes.onseeked = `${callbackName}()`
		
		return this
	}
	
	onSeeking = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onSeeking`
		
		window[callbackName] = callback
		this._attributes.onseeking = `${callbackName}()`
		
		return this
	}
	
	onSelect = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onSelect`
		
		window[callbackName] = callback
		this._attributes.onselect = `${callbackName}()`
		
		return this
	}
	
	onStalled = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onStalled`
		
		window[callbackName] = callback
		this._attributes.onstalled = `${callbackName}()`
		
		return this
	}
	
	onSubmit = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onSubmit`
		
		window[callbackName] = callback
		this._attributes.onsubmit = `${callbackName}()`
		
		return this
	}
	
	onSuspend = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onSuspend`
		
		window[callbackName] = callback
		this._attributes.onsuspend = `${callbackName}()`
		
		return this
	}
	
	onTimeUpdate = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onTimeUpdate`
		
		window[callbackName] = callback
		this._attributes.ontimeupdate = `${callbackName}()`
		
		return this
	}
	
	onToggle = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onToggle`
		
		window[callbackName] = callback
		this._attributes.ontoggle = `${callbackName}()`
		
		return this
	}
	
	onUnload = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onUnload`
		
		window[callbackName] = callback
		this._attributes.onunload = `${callbackName}()`
		
		return this
	}
	
	onVolumeChange = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onVolumeChange`
		
		window[callbackName] = callback
		this._attributes.onvolumechange = `${callbackName}()`
		
		return this
	}
	
	onWaiting = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onWaiting`
		
		window[callbackName] = callback
		this._attributes.onwaiting = `${callbackName}()`
		
		return this
	}
	
	onWheel = callback => {
		if (!this._id)
			this._id = __internal_generateElementId()
		
		const callbackName = `__internal_${this._id}_onWheel`
		
		window[callbackName] = callback
		this._attributes.onwheel = `${callbackName}()`
		
		return this
	}
	
	open = value => {
		this._attributes.open = value
		
		return this
	}
	
	optimum = value => {
		this._attributes.optimum = value
		
		return this
	}
	
	pattern = value => {
		this._attributes.pattern = value
		
		return this
	}
	
	placeholder = value => {
		this._attributes.placeholder = value
		
		return this
	}
	
	poster = value => {
		this._attributes.poster = value
		
		return this
	}
	
	preload = value => {
		this._attributes.preload = value
		
		return this
	}
	
	readonly = value => {
		this._attributes.readonly = value
		
		return this
	}
	
	rel = value => {
		this._attributes.rel = value
		
		return this
	}
	
	required = value => {
		this._attributes.required = value
		
		return this
	}
	
	reversed = value => {
		this._attributes.reversed = value
		
		return this
	}
	
	rows = value => {
		this._attributes.rows = value
		
		return this
	}
	
	rowSpan = value => {
		this._attributes.rowspan = value
		
		return this
	}
	
	sandbox = value => {
		this._attributes.sandbox = value
		
		return this
	}
	
	scope = value => {
		this._attributes.scope = value
		
		return this
	}
	
	selected = value => {
		this._attributes.selected = value
		
		return this
	}
	
	shape = value => {
		this._attributes.shape = value
		
		return this
	}
	
	size = value => {
		this._attributes.size = value
		
		return this
	}
	
	sizes = value => {
		this._attributes.sizes = value
		
		return this
	}
	
	span = value => {
		this._attributes.span = value
		
		return this
	}
	
	spellCheck = value => {
		this._attributes.spellcheck = value
		
		return this
	}
	
	src = value => {
		this._attributes.src = value
		
		return this
	}
	
	srcDoc = value => {
		this._attributes.srcdoc = value
		
		return this
	}
	
	srcLang = value => {
		this._attributes.srclang = value
		
		return this
	}
	
	srcSet = value => {
		this._attributes.srcset = value
		
		return this
	}
	
	start = value => {
		this._attributes.start = value
		
		return this
	}
	
	step = value => {
		this._attributes.step = value
		
		return this
	}
	
	style = value => {
		this._attributes.style = typeof value === 'string'
			? value
			: Object.entries(value)
				.map(([key, value]) => `${key}:${value}`)
				.join(';')
		
		return this
	}
	
	tabIndex = value => {
		this._attributes.tabindex = value
		
		return this
	}
	
	target = value => {
		this._attributes.target = value
		
		return this
	}
	
	title = value => {
		this._attributes.title = value
		
		return this
	}
	
	translate = value => {
		this._attributes.translate = value
		
		return this
	}
	
	type = value => {
		this._attributes.type = value
		
		return this
	}
	
	useMap = value => {
		this._attributes.usemap = value
		
		return this
	}
	
	value = value => {
		this._attributes.value = value
		
		return this
	}
	
	width = value => {
		this._attributes.width = value
		
		return this
	}
	
	wrap = value => {
		this._attributes.wrap = value
		
		return this
	}
	
	_render = () => {
		let acc = `<${this._name}${this._renderAttributes()}>`
		
		if (this._isVoidElement)
			return acc
		
		acc += renderToString(this._children)
		
		return `${acc}</${this._name}>`
	}
	
	_renderAttributes = () => {
		let acc = []
		
		for (const key in this._attributes)
			acc.push(`${key}="${this._attributes[key]}"`)
		
		return acc.length ? ` ${acc.join(' ')}` : ''
	}
}

const state = (name, value) =>
	__internal_setState(
		typeof name === 'object'
			? name
			: { [name]: value }
	)

const a = () => new __internal_Element('a')
const abbr = () => new __internal_Element('abbr')
const address = () => new __internal_Element('address')
const article = () => new __internal_Element('article')
const aside = () => new __internal_Element('aside')
const audio = () => new __internal_Element('audio')
const b = () => new __internal_Element('b')
const bdi = () => new __internal_Element('bdi')
const bdo = () => new __internal_Element('bdo')
const blockquote = () => new __internal_Element('blockquote')
const body = () => new __internal_Element('body')
const button = () => new __internal_Element('button')
const canvas = () => new __internal_Element('canvas')
const caption = () => new __internal_Element('caption')
const cite = () => new __internal_Element('cite')
const code = () => new __internal_Element('code')
const colgroup = () => new __internal_Element('colgroup')
const data = () => new __internal_Element('data')
const datalist = () => new __internal_Element('datalist')
const dd = () => new __internal_Element('dd')
const del = () => new __internal_Element('del')
const details = () => new __internal_Element('details')
const dfn = () => new __internal_Element('dfn')
const dialog = () => new __internal_Element('dialog')
const div = () => new __internal_Element('div')
const dl = () => new __internal_Element('dl')
const dt = () => new __internal_Element('dt')
const em = () => new __internal_Element('em')
const fieldset = () => new __internal_Element('fieldset')
const figcaption = () => new __internal_Element('figcaption')
const figure = () => new __internal_Element('figure')
const footer = () => new __internal_Element('footer')
const form = () => new __internal_Element('form')
const h1 = () => new __internal_Element('h1')
const h2 = () => new __internal_Element('h2')
const h3 = () => new __internal_Element('h3')
const h4 = () => new __internal_Element('h4')
const h5 = () => new __internal_Element('h5')
const h6 = () => new __internal_Element('h6')
const head = () => new __internal_Element('head')
const header = () => new __internal_Element('header')
const hgroup = () => new __internal_Element('hgroup')
const html = () => new __internal_Element('html')
const i = () => new __internal_Element('i')
const iframe = () => new __internal_Element('iframe')
const ins = () => new __internal_Element('ins')
const kbd = () => new __internal_Element('kbd')
const label = () => new __internal_Element('label')
const legend = () => new __internal_Element('legend')
const li = () => new __internal_Element('li')
const main = () => new __internal_Element('main')
const map = () => new __internal_Element('map')
const mark = () => new __internal_Element('mark')
const math = () => new __internal_Element('math')
const menu = () => new __internal_Element('menu')
const meter = () => new __internal_Element('meter')
const nav = () => new __internal_Element('nav')
const noscript = () => new __internal_Element('noscript')
const object = () => new __internal_Element('object')
const ol = () => new __internal_Element('ol')
const optgroup = () => new __internal_Element('optgroup')
const option = () => new __internal_Element('option')
const output = () => new __internal_Element('output')
const p = () => new __internal_Element('p')
const picture = () => new __internal_Element('picture')
const pre = () => new __internal_Element('pre')
const progress = () => new __internal_Element('progress')
const q = () => new __internal_Element('q')
const rb = () => new __internal_Element('rb')
const rp = () => new __internal_Element('rp')
const rt = () => new __internal_Element('rt')
const rtc = () => new __internal_Element('rtc')
const ruby = () => new __internal_Element('ruby')
const s = () => new __internal_Element('s')
const samp = () => new __internal_Element('samp')
const script = () => new __internal_Element('script')
const section = () => new __internal_Element('section')
const select = () => new __internal_Element('select')
const slot = () => new __internal_Element('slot')
const small = () => new __internal_Element('small')
const span = () => new __internal_Element('span')
const strong = () => new __internal_Element('strong')
const style = () => new __internal_Element('style')
const sub = () => new __internal_Element('sub')
const summary = () => new __internal_Element('summary')
const sup = () => new __internal_Element('sup')
const svg = () => new __internal_Element('svg')
const table = () => new __internal_Element('table')
const tbody = () => new __internal_Element('tbody')
const td = () => new __internal_Element('td')
const template = () => new __internal_Element('template')
const textarea = () => new __internal_Element('textarea')
const tfoot = () => new __internal_Element('tfoot')
const th = () => new __internal_Element('th')
const thead = () => new __internal_Element('thead')
const time = () => new __internal_Element('time')
const title = () => new __internal_Element('title')
const tr = () => new __internal_Element('tr')
const u = () => new __internal_Element('u')
const ul = () => new __internal_Element('ul')
const var_ = () => new __internal_Element('var')
const video = () => new __internal_Element('video')

const area = () => new __internal_Element('area', true)
const base = () => new __internal_Element('base', true)
const br = () => new __internal_Element('br', true)
const col = () => new __internal_Element('col', true)
const embed = () => new __internal_Element('embed', true)
const hr = () => new __internal_Element('hr', true)
const img = () => new __internal_Element('img', true)
const input = () => new __internal_Element('input', true)
const link = () => new __internal_Element('link', true)
const menuitem = () => new __internal_Element('menuitem', true)
const meta = () => new __internal_Element('meta', true)
const param = () => new __internal_Element('param', true)
const source = () => new __internal_Element('source', true)
const track = () => new __internal_Element('track', true)
const wbr = () => new __internal_Element('wbr', true)

const selector = (key, rules) =>
	({ key, rules })

const css = selectors =>
	style()
		.children([
			selectors
				.map(({ key, rules }) =>
					`${key}{${
						Object.entries(rules)
							.map(([name, value]) => `${name}:${value}`)
							.join(';')
					}}`
				)
				.join('')
		])

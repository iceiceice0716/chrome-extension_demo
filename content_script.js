
window.addEventListener('click', evt => {
	if (!evt.isTrusted) return;
	let target = evt.target;
	while (target && target.tagName.toLowerCase() !== 'a') {
		target = target.parentElement;
	}
	if (target) {
		// check for baseVal of svg a tag's href-SVGAnimatedString
		const url = target instanceof SVGAElement ? target.href.baseVal : target.href;
		console.log(url)
		if (url.startsWith('file://')) {
			evt.preventDefault();
			try {
				chrome.runtime.sendMessage({
					method: 'openLocalFile',
					localFileUrl: url,
				});
			} catch (e) {}
		}
	}
}, {
	capture: true,
});

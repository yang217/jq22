(function moveTh() {
	var dragTimer;
	var self;
	function DragTh() {
		self = this;
		this.mouseDown = false;
		this.top = $('#demo thead').offset().top;
		this.currentX = null;
		this.el = null;
		this.leftElWidth = null;
		this.rightElWidth = null;
		this.leftElLeft = null;
		this.rightElLeft = null;
		this. storeWidthArr = [];
	}
	DragTh.prototype = {
		addStyle: function () {
			var styleStr = '.lineContainer {height: 36px; width: 0; position: absolute; right: 0; width: 0;}'
				+ '.line {width: 15px; border-left: 1px dashed #ccc; position: absolute; display: inline-block; opacity: 0}' 
				+ ' .line:hover {cursor: e-resize;}';
			$('style').eq(0).append(styleStr)
			return this;
		},
		renderLine: function () {
			var cellHeight = $('.list-item').height();
			if ($('.line').length) $('.line').remove();
			self.top = $('#demo thead').offset().top;
			var tdLen = $('#demo thead>tr td').length - 1;
			var lineStr =  '<div class="line"></div>'.repeat(tdLen);
			$('body .list-item:first-child').before('<div class="lineContainer"></div>');
			$('.lineContainer').append(lineStr);
			$('.line').height(cellHeight);
			$('.line').each(function (index) {
				$(this).offset({
					top: self.top,
					left: $('#demo thead>tr td').eq(index + 1).offset().left
				})
			})
			return this;
		},
		addStore: function () {
			var storeKey = location.href.match(/\w+(?=\.aspx)/)[0] + '-width';
			self.storeWidthArr = [];
			$('#demo thead>tr td').each(function () {
				self.storeWidthArr.push($(this).css('width'));
			})
			window.localStorage.setItem(storeKey, JSON.stringify(self.storeWidthArr));
			return this;
		},
		renderStore: function () {
			var storeKey = location.href.match(/\w+(?=\.aspx)/)[0] + '-width';
			if (window.localStorage.getItem(storeKey)) {
				$('#demo thead>tr td').each(function (index) {
					$(this).css('width', JSON.parse(window.localStorage.getItem(storeKey))[index])
				})
			}
			return this;
		},
		bindEvent: function () {
			var tds = $('#demo thead>tr td');
			$('.list').on('mousedown', '.line', function (e) {
				e.preventDefault()
				self.top = $('#demo thead').offset().top;
				self.mouseDown = true;
				self.el = $(this);
				self.el.css('opacity', 1);
				self.currentX = $(this).offset().left;
				self.leftEl = tds.eq($(this).index());
				self.leftElWidth = parseInt(self.leftEl.css('width'));
				self.rightEl = self.leftEl.next();
				self.rightElWidth = parseInt(self.rightEl.css('width'));
				self.leftElLeft = self.leftEl.offset().left;
				self.rightElLeft = self.rightEl.offset().left;
			}).on('mouseleave', function () {
				self.mouseDown = false;
				if (self.el) {
				self.el.css('opacity', 0);
				}
			}).on('mousemove', function (e) {
				e.preventDefault();
				if (self.mouseDown) {
					var
						pageX = e.pageX <=  self.leftElLeft + 10 ? self.leftElLeft + 10 : e.pageX >= self.rightElLeft + self.rightElWidth - 10 ?  self.rightElLeft + self.rightElWidth - 10 : e.pageX,
						leftCurrentWidth = self.leftElWidth - (self.currentX - pageX),
						rightCurrentWidth = self.rightElWidth + (self.currentX - pageX);
					self.el.offset({
						top: self.top,
						left: pageX
					})
						self.leftEl.css('width', pageX - self.leftElLeft + 'px');
						self.rightEl.css('width', self.leftElWidth + self.rightElWidth - parseInt(self.leftEl.css('width')) + 'px');
				}
			})
			$(document).on('mouseup', function documentMouseUp() {
				self.mouseDown = false;
				if (self.el) {
					self.el.css('opacity', 0);
				}
				self.addStore();
			})
			return this;
		},
		offEvent: function () {
			$('.list').off('mousedown', '**');
			$('.list').off('mouseleave', '**');
			$('.list').off('mousemove', '**');
			$(document).off('mouseup');
			return this;
		}
	}
	dragTimer = setInterval(function() {
		if (!document.querySelector('#demo thead')) return false;
		clearInterval(dragTimer);
		var dragTh =  new DragTh();
		dragTh.renderStore().addStyle().renderLine().bindEvent();
		//dom突变事件开始
		var tableContainer  = [$('.list.box')[0], ($('.jplistYL')[0] ? $('.jplistYL')[0] : $('tbody')[0])]
		var dragOption = {
			'childList': true
		}
		var observer = new MutationObserver(function() {
			setTimeout(function() {
				$('.lineContainer').remove();
				dragTh.offEvent();
				dragTh = new DragTh();
				console.log(999);
				dragTh.renderStore().renderLine().bindEvent();
			}, 20);
			setTimeout(function() {
				observer.disconnect();
				tableContainer.forEach(function (item) {
					setTimeout(observer.observe.bind(observer, item, dragOption), 25);
				})
			}, 0);
		})
		tableContainer.forEach(function (item) {
			observer.observe(item, dragOption);
		})
	}, 0);
})();
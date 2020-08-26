$(function() {
	const $gnb = $('#gnb > li');
	const $indicate = $('.indicate > li');
	const $slideCtn = $('#slide > .topvisual > .slide-container ');
	const $prev = $('.arr > .Prev');
	const $next = $('.arr > .Next');
	const $autoBtn = $('#slide > .topvisual > .play');
	const $indicateBottom = $('#sampyo-story > .fade-container > li > a');
	const $allMenuBtn = $('.fotter-container > .fotter-container-in > .menu-all ');
	const $allMenuView = $('#fot-gnb');
	let imgLength = $('.slide-container > li').length - 1;
	let interValId = null;
	let nowIdx = 0;
	let newsIdx = 0;
	let intervalNewId = null;

	/******** 시작 준비부분 *******/
	//시작 인디케이터 버튼 on
	$indicate.eq(0).addClass('on');
	//arr 호버
	$('#slide > .topvisual').on('mouseover', function() {
		$('.arr > p').stop().fadeIn(500);
	});
	$('#slide > .topvisual').on('mouseout', function() {
		$('.arr > p').stop().fadeOut(500);
	});

	/******** 네비게이션 호버이벤트 *******/
	$gnb.on('mouseover', function() {
		$(this).children('.lnb').show();
	});
	$gnb.on('mouseleave', function() {
		$(this).children('.lnb').hide();
	});

	/************* slide ****************/
	// 이미지 이동 함수
	const moveCtnFn = function() {
		$slideCtn.stop().animate(
			{
				left: -940 * nowIdx
			},
			400
		);
		$indicate.eq(nowIdx).addClass('on').siblings().removeClass('on');
	};
	//다음인덱스 축출 함수
	let nextIdx = function() {
		if (nowIdx < imgLength) {
			nowIdx++;
		} else {
			nowIdx = 0;
		}
	};
	//이전인덱스 축출 함수
	let prevIdx = function() {
		if (nowIdx > 0) {
			nowIdx--;
		} else {
			nowIdx = imgLength;
		}
	};
	//오토 플레이 함수
	const autoPlay = function() {
		interValId = setInterval(function() {
			nextIdx();
			moveCtnFn();
		}, 3000);
		$autoBtn.addClass('pause');
	};
	autoPlay();
	//인디케이터 클릭이벤트
	$indicate.on('click', function(evt) {
		nowIdx = $indicate.index(this);
		moveCtnFn();
	});

	//이전버큰 클릭 이벤트
	$prev.on('click', function() {
		prevIdx();
		moveCtnFn();
	});
	// 다음버튼 클릭 이벤트
	$next.on('click', function() {
		nextIdx();
		moveCtnFn();
	});
	//자동실행 클릭 이벤트
	$autoBtn.on('click', function() {
		console.log('dD?');
		if ($(this).hasClass('pause')) {
			clearInterval(interValId);
			$autoBtn.removeClass('pause');
		} else {
			autoPlay();
		}
	});
	/******** News slide *******/
	// 공통함수
	const moveFn = function() {
		$indicateBottom.eq(newsIdx).parent().fadeOut(1000).siblings().fadeIn(1000);
	};
	const newsAutoPlayFN = function() {
		intervalNewId = setInterval(function() {
			if (newsIdx == 1) {
				newsIdx--;
			} else if (newsIdx == 0) {
				newsIdx++;
			}
			moveFn();
			console.log(newsIdx);
		}, 4000);
	};
	newsAutoPlayFN(0);

	//오토 플레이 클릭이벤트
	const $newsAutoPlay = $('#sampyo-story > .story-player > .play');
	$newsAutoPlay.on('click', function() {
		clearInterval(intervalNewId);
		newsAutoPlayFN();
	});
	//오토 플레이 멈춤 이벤트
	const $newsAutoStop = $('#sampyo-story > .story-player > .stop');
	$newsAutoStop.on('click', function() {
		clearInterval(intervalNewId);
	});
	//이미지 클릭이벤트
	$indicateBottom.on('click', function(evt) {
		clearInterval(intervalNewId);
		evt.preventDefault();
		newsIdx = $indicateBottom.index(this);
		moveFn();
	});

	/******** footer *******/
	const $familyBtn = $('#family-site');
	const $failyView = $('#family-site > ul');
	$familyBtn.on('click', function() {
		if ($failyView.hasClass('on')) {
			$failyView.removeClass('on');
		} else {
			$failyView.addClass('on');
		}
	});
	//상위 이동버튼 클릭이벤트
	const $Topbtn = $('.fotter-container > .fotter-container-in > .top ');
	$Topbtn.on('click', function() {
		$('html, body').stop().animate(
			{
				scrollTop: 0
			},
			'easeInOutCubic'
		);
	});

	//메뉴 전체보기 클릭이벤트
	//애니메이트 사라질때 적용이 안됨..ㅡㅡ....
	$allMenuBtn.on('click', function(evt) {
		evt.preventDefault();
		if ($allMenuView.hasClass('on')) {
			$allMenuView.removeClass('on');
		} else {
			$allMenuView.addClass('on');
		}
		$('html, body').stop().animate(
			{
				scrollTop: $allMenuView.offset().top
			},
			'easeInOutCubic'
		);
	});
});

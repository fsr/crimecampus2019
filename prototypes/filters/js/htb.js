jQuery(function () {

	//Game settings
	const TARGET_FPS = 30
	const BIRD_IMAGE_UPDATES_PER_SECOND = 5
	const GAME_DURATION_IN_SECONDS = 30
	const NUM_BIRD_SPAWNS_PER_SECOND = 1
	const MIN_SCORE_TO_WIN = 300
	const SPEED_DEAD_BIRD_PIX_PER_SEC = 150
	const SPEED_LIVING_BIRD_PIX_PER_SEC = 48


	function Feld() {

		this.vogel1 = new Image();
		this.vogel2 = new Image();
		this.vogel3 = new Image();
		this.vogel4 = new Image();
		this.vogel5 = new Image();
		this.vogel6 = new Image();
		this.vogel1.src = "./assets/Vogel1.png";
		this.vogel2.src = "./assets/Vogel2.png";
		this.vogel3.src = "./assets/Vogel3.png";
		this.vogel4.src = "./assets/Vogel4.png";
		this.vogel5.src = "./assets/Vogel5.png";
		this.vogel6.src = "./assets/Vogel6.png";
		this.punkte = 0;
		this.zeit = Math.round(GAME_DURATION_IN_SECONDS * 1000 / TARGET_FPS);
	}
	
 	const SPEED_ALIVE = Math.round(SPEED_LIVING_BIRD_PIX_PER_SEC * TARGET_FPS / 1000) +1
	function Vogel(posY, dir, size) {
		if (parseInt(Math.random() * 100) > 50)
			this.direction = 1;
		else
			this.direction = -1;

		this.x = (this.direction == 1) ? -70 : 480;
		this.y = parseInt(Math.random() * 270);
		this.bird = 1;
		this.speed = SPEED_ALIVE + parseInt(Math.random() * 3);
		this.img = (this.direction == 1) ? feld.vogel1 : feld.vogel4;
		this.scale = 0.5 + (Math.random() * 0.5);
		this.isalive = true;
	}
	/*
	 * Initialisierung
	 */
	// CanvasInit
	var canvas = document.getElementById('feld');

	if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		setInterval(game_loop, 1000 / TARGET_FPS);
		setInterval(add_bird, 1000);
		ctx.globalCompositeOperation = 'destination-over';
	}
	// Voegel und Feld initialisierung
	var feld = new Feld();
	vogel = new Array();
	vogel.push(new Vogel());

	var loopCount = 0
	const FRAMES_UNTIL_BIRD_IMAGE_UPDATE =
	 								Math.round(1000 / BIRD_IMAGE_UPDATES_PER_SECOND / TARGET_FPS)

	function game_loop() {
		if (feld.zeit > 0) {
			ctx.clearRect(0, 0, 480, 320); // CLS
			draw_birds(); // zeichne Voegel
			if(loopCount % FRAMES_UNTIL_BIRD_IMAGE_UPDATE == 0)
				change_bird(); // wechsel image & pos
			moveBirds();
			$("#zeit").val(parseInt(feld.zeit * TARGET_FPS / 1000));
			feld.zeit--;
			++loopCount;
		} else {
			ctx.clearRect(0, 0, 480, 320); // CLS
			for (var i = 0; i < vogel.length; i++) {
				vogel.push();
			}
			//document.refresh();
			$("#zeit").val("Ende");
			if ($('#punkte').val() > MIN_SCORE_TO_WIN) {
				document.getElementById('weiter').style.visibility = "visible";
			}
		}
	}

	const DEAD_SPEED = Math.round(SPEED_DEAD_BIRD_PIX_PER_SEC * TARGET_FPS / 1000) + 1
	function moveBirds() {
		for (var i = 0; i < vogel.length; i++) {
			if (vogel[i].isalive == true) {
				if (vogel[i].direction >= 1) {
					vogel[i].x += vogel[i].speed;
				}else{
					vogel[i].x -= vogel[i].speed;
				}
			}
			else if (vogel[i].y <= 320) {
				vogel[i].y += DEAD_SPEED;
			}
		}
	}
	/*
	 * Wechselt Bilder und Position
	 */

	function change_bird() {
		for (var i = 0; i < vogel.length; i++) {
			if (vogel[i].isalive == true) {
				switch (vogel[i].img) {
					case feld.vogel1:
						vogel[i].img = feld.vogel3;
						break;
					case feld.vogel2:
						vogel[i].img = feld.vogel1;
						break;
					case feld.vogel3:
						vogel[i].img = feld.vogel2;
						break;
					case feld.vogel4:
						vogel[i].img = feld.vogel6;
						break;
					case feld.vogel5:
						vogel[i].img = feld.vogel4;
						break;
					case feld.vogel6:
						vogel[i].img = feld.vogel5;
						break;
				}
			}
		}
	}
	/*
	 * Alle 3 Sekunden respawn
	 */
	function add_bird() {
		for(i = 0; i < NUM_BIRD_SPAWNS_PER_SECOND; ++i)
			vogel.push(new Vogel());
	}

	function draw_birds() {
		for (var i = 0; i < vogel.length; ++i) {
			if (vogel[i].isalive == true || vogel[i].x > -70 || vogel[i].x <= 480) {
				if (vogel[i].direction == 1)
					ctx.drawImage(vogel[i].img, vogel[i].x, vogel[i].y,
						70 * vogel[i].scale, 50 * vogel[i].scale);
				else {
					// vogel[i].img.transform(-70 * vogel[i].scale, -50 *
					// vogel[i].scale);
					ctx.drawImage(vogel[i].img, vogel[i].x, vogel[i].y,
						70 * vogel[i].scale, 50 * vogel[i].scale);
					// ctx.translate();
				}
			}
		}
	}
	/*
	 * Schießen (iPhone durch tab ersetzen)
	 */

	$("#feld").click(
		function (e) {
			// alert(e.pageX+" - "+e.pageY);
			for (var i = 0; i < vogel.length; i++) {
				if (e.pageX > vogel[i].x && e.pageX < (vogel[i].x + (70 * vogel[i].scale)) && e.pageY > vogel[i].y && e.pageY < (vogel[i].y + (50 * vogel[i].scale))) {
					vogel[i].isalive = false;
					feld.punkte += parseInt(20 * (1 / vogel[i].scale));
					$("#punkte").val(feld.punkte);
				}
			}
		});
});

function neustart() {
	location.reload(true);
}

function weiter() {
	window.location.replace("./videoselection.html");
}

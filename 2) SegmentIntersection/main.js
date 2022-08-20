window.onload = function () {
  var canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let clickPoints = 0;
  const A = { x: 50, y: 150 };
  const B = { x: 300, y: 300 };
  const C = { x: 50, y: 50 };
  const D = { x: 300, y: 350 };
  document.onmousedown = (event) => {
    clickPoints = getClickPoints(event.clientX, event.clientY);
    if (clickPoints) {
      document.body.addEventListener("mousemove", onMouseMoveHandler);
      document.body.addEventListener("mouseup", onMouseUpHandler);
    }
  };
  function onMouseMoveHandler(e) {
    clickPoints.x = e.clientX;
    clickPoints.y = e.clientY;
  }
  function onMouseUpHandler() {
    document.body.removeEventListener("mousemove", onMouseMoveHandler);
    document.body.removeEventListener("mouseup", onMouseUpHandler);
  }
  function getClickPoints(x, y) {
    let points = [A, B, C, D];
    for (let i = 0; i < points.length; i++) {
      const p = points[i],
        dx = p.x - x,
        dy = p.y - y,
        dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 10) {
        return p;
      }
    }
  }

  render();
  function render() {
    ctx.clearRect(0, 0, width, height);
    let interSection = getIntersection(A, B, C, D);
    drawDot(A, "A");
    drawDot(B, "B");
    drawDot(C, "C");
    drawDot(D, "D");
    if (interSection) {
      drawDot(interSection, "i");
    }
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.moveTo(C.x, C.y);
    ctx.lineTo(D.x, D.y);
    ctx.stroke();
    function drawDot(point, label) {
      // Making a circle like structure on the starting point of lines.
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Put text inside that circle
      ctx.fillStyle = "black";
      ctx.font = "bold 14px arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, point.x, point.y);
    }
    requestAnimationFrame(render);
  }
  function getIntersection(P1, P2, P3, P4) {
    let A1 = P2.y - P1.y,
      B1 = P1.x - P2.x,
      C1 = A1 * P1.x + B1 * P1.y;
    let A2 = P4.y - P3.y,
      B2 = P3.x - P4.x,
      C2 = A2 * P3.x + B2 * P3.y;

    let top1 = C1 * B2 - C2 * B1;
    let top2 = -(C1 * A2 - A1 * C2);
    let denominator = A1 * B2 - A2 * B1;
    if (denominator == 0) {
      console.log(denominator)
      return null;
    }
    return {
      x: top1 / denominator,
      y: top2 / denominator,
    };
  }
};

// Taken from https://github.com/zindlerb/apparatus/blob/master/src/View/Manager/DragManager.coffee
import _ from 'lodash';

class Drag {
  constructor(mouseDownEvent, spec) {
    _.extend(this, spec);
    this.originalX = mouseDownEvent.clientX;
    this.originalY = mouseDownEvent.clientY;

    if (this.consummated === undefined) {
      this.consummated = false;
    }
  }
}

/*
	inside the spec uses ctx to get access to the spec make sure to use func not =>

	Spec:
		onDrag
		onEnd
		onConsummate
*/

class DragManager {
  constructor() {
    this.drag = null;
    window.addEventListener('mousemove', this._onMouseMove.bind(this), true);
    window.addEventListener('mouseup', this._onMouseUp.bind(this), true);
  }

  start(mouseDownEvent, spec) {
    this.drag = new Drag(mouseDownEvent, spec);
  }

  _onMouseMove(mouseMoveEvent) {
    if (!this.drag) return;
    const dx = mouseMoveEvent.clientX - this.drag.originalX;
    const dy = mouseMoveEvent.clientY - this.drag.originalY;
    if (!this.drag.consummated) {
      // Check if we should consummate.
      const d = Math.max(Math.abs(dx), Math.abs(dy));
      if (d > 3) {
        this._consummate(mouseMoveEvent);
      }
    } else if (this.drag.onDrag) {
      this.drag.onDrag(mouseMoveEvent, {dx, dy});
    }
  }

  _onMouseUp(mouseUpEvent) {
    if (!this.drag) return;
    if (this.drag.onEnd) {
      this.drag.onEnd(mouseUpEvent);
    }

    this.drag = null;
  }

  _consummate(mouseMoveEvent) {
    this.drag.consummated = true;
    if (this.drag.onConsummate) {
      this.drag.onConsummate(mouseMoveEvent);
    }
  }
}

const dragManager = new DragManager();
export default dragManager;

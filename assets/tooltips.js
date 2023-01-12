class Tooltip extends HTMLElement {
  constructor() {
    super();
    this.container = this.closest(".tooltips__container")
    this.tooltip = this.querySelector(".tooltip")
    this.tooltipMobile = this.querySelector(".tooltip-mobile")
    this.tooltipLabel = this.querySelector(".tooltip__label")
    this.tooltipDot = this.querySelector(".tooltip__dot")
    this.tooltipLine = this.querySelector(".tooltip__line line")

    if (this.tooltip.dataset.verticalStart > 50 ) {
      this.initializeTippy('bottom');
    } else {
      this.initializeTippy('top');
    }

    if (this.tooltipMobile?.dataset.verticalStart > 50 ) {
      this.initializeMobileTippy('bottom');
    } else {
      this.initializeMobileTippy('top');
    }

    this.getLineCoordinates();
    this.animateTooltip();

    window.addEventListener("resize", (e) => {
      this.getLineCoordinates();
    })
  
  }
  animateTooltip() {
    const lineLength = this.tooltipLine.getTotalLength()
    this.tooltipLine.style.strokeDasharray = lineLength + " " + lineLength
    this.tooltipLine.style.strokeDashoffset = lineLength
    this.tooltipLine.getBoundingClientRect();

    gsap.from(this.tooltip, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'sine',
      stagger: {
        each: 0.5,
        from: 'end',
      },
      scrollTrigger: {
        trigger: this.tooltip,
        start: 'top 65%',
      },
    });

    gsap.to(this.tooltipLine, {
      strokeDashoffset: 0,
      ease: "none",
      duration: 1,
      scrollTrigger: {
        trigger: this.tooltip,
        start: 'top 70%',
      },
    })
  }
  initializeTippy(x){
    if ( typeof tippy == 'undefined' ){
      setTimeout(() => {
        this.initializeTippy(x)
      }, 1000)
    } else {
      console.log("Tippy is now available")
      tippy(this.querySelector(".tooltip__trigger"), {
        content: this.dataset.tooltipContent,
        placement: x,
        theme: 'laughland-blue',
      })
    }
  }
  initializeMobileTippy(x){
    if ( typeof tippy == 'undefined' ){
      setTimeout(() => {
        this.initializeTippy(x)
      }, 1000)
    } else {
      console.log("Tippy is now available")
      tippy(this.querySelector(".tooltip__trigger-mobile"), {
        content: this.dataset.tooltipContent,
        placement: x,
        trigger: "click",
        theme: 'laughland-blue',
      })
    }
  }
  getLineCoordinates() {
    // if dataset.verticalStart < 50, start line above label
    if( this.tooltip.dataset.verticalStart < 50) {
      var y1 = this.tooltip.offsetTop;
    } else {
      var y1 = this.tooltip.offsetTop + (this.tooltip.offsetHeight);
    }

    var x1 = this.tooltip.offsetLeft + (this.tooltipLabel.offsetWidth/2);
    var x2 = this.tooltipDot.offsetLeft + (this.tooltipDot.offsetWidth/2);
    var y2 = this.tooltipDot.offsetTop + (this.tooltipDot.offsetHeight/2);

    this.setAttributes( this.tooltipLine, {'x1': x1,'y1': y1, 'x2': x2, 'y2': y2})
  }

  setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
}

customElements.define('tool-tip', Tooltip);
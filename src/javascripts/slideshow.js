import $ from 'jquery';

export default class Slideshow {
  constructor(selector) {
    this.$slideshow = $(selector);
    this.currentImage = 0;
    this.hideAllImages();
    this.showImage(this.currentImage);

    window.setInterval(() => this.nextImage(), this.$slideshow.attr('data-interval'));
  }

  hideAllImages() {
    $('img', this.$slideshow).hide();
  }

  showImage(index) {
   $('img', this.$slideshow).eq(index).show();
  }

  fadeInImage(index) {
   $('img', this.$slideshow).eq(index).fadeIn();
  }

  fadeOutImage(index) {
   $('img', this.$slideshow).eq(index).fadeOut();
  }

  totalImages() {
    return $('img', this.$slideshow).size();
  }

  nextImage() {
    var nextImage = (this.currentImage + 1) % this.totalImages();


    this.fadeOutImage(this.currentImage);
    this.fadeInImage(nextImage);

    this.currentImage = nextImage;
  }
}

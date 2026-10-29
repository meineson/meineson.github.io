(function($) {
  $(".content").each(function(i) {
    $(this).find("img").each(function() {
      var $img = $(this);
      if ($img.hasClass("nofancybox") || $img.hasClass("logo-img")) return;

      var $parent = $img.parent("a");
      if ($parent.length > 0) {
        var href = $parent.attr("href");
        // 如果 <a> 原本链接的就是图片本身，则赋予 fancybox 放大预览功能
        if (href && /\.(jpe?g|png|gif|webp|svg|bmp)(\?.*)?$/i.test(href)) {
          $parent.addClass("fancybox").attr("rel", "gallery" + i);
          if ($img.attr("alt") && !$parent.attr("title")) {
            $parent.attr("title", $img.attr("alt"));
          }
        }
        // 如果 <a> 是外部网页/视频等自定义业务链接，直接保留，不接管
        return;
      }

      // 普通图片（无外层超链接）时才自动包裹 fancybox 灯箱
      var alt = this.alt;
      if (alt) {
        $img.wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox" rel="gallery' + i + '" />');
      } else {
        $img.wrap('<a href="' + this.src + '" class="fancybox" rel="gallery' + i + '" />');
      }
    });
  });

  var play = function(parent, item, callback) {
    var width = parent.width();
    item.imagesLoaded(function() {
      var _this = this[0],
          nWidth = _this.naturalWidth,
          nHeight = _this.naturalHeight;
      callback();
      this.animate({opacity: 1}, 500);
      parent.animate({height: width * nHeight / nWidth}, 500);
    });
  };

  $(".gallery").each(function() {
    var $this = $(this),
        current = 0,
        photoset = $this.children(".photoset").children(),
        all = photoset.length,
        loading = true;

    play($this, photoset.eq(0), function() {
      loading = false;
    });

    $this.on("click", ".prev", function() {
      if (!loading) {
        var next = (current - 1) % all;
        loading = true;
        play($this, photoset.eq(next), function() {
          photoset.eq(current).animate({opacity: 0}, 500);
          loading = false;
          current = next;
        });
      }
    }).on("click", ".next", function() {
      if (!loading) {
        var next = (current + 1) % all;
        loading = true;
        play($this, photoset.eq(next), function() {
          photoset.eq(current).animate({opacity: 0}, 500);
          loading = false;
          current = next;
        });
      }
    });
  });
})(jQuery);
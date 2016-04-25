module.exports = function(app, page) {
  mainView.history = [];
  return mainView.router.load({
    url: "page/index.html",
    animatePages: false
  });
};

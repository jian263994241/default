
var other = React.createClass({
  componentDidMount: function() {
    // document.addEventListener('touchmove',(e)=>{
    //   e.preventDefault();
    // });
    var swiper = app.swiper(this.refs['swiper-container'], {
        // scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
    });

    setTimeout(()=>{
      swiper.update();
    }, 1000);
  },
  render: function() {
    let srollbar = ()=>{
      if(this.props.scrollbar){
        return (
          <div className="swiper-scrollbar">
            <div className="swiper-scrollbar-drag"></div>
          </div>
        );
      }
    };
    let styleFix = {
      height:'auto',
      WebkitBoxSizing:'border-box'
    };
    return (
      <div className="page-content swiper-container" ref="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide" style={styleFix}>
            <div className="content-block-title">
              页面标题
            </div>
            <div className="content-block">
              <p>
                <a className="back" href="">返回</a>
              </p>
            </div>
            <img src={__uri('/res/images/logo-new@2x.png')} alt=""/>
            <img src={__uri('/res/images/logo-new@2x.png')} alt=""/>
            <img src={__uri('/res/images/logo-new@2x.png')} alt=""/>
            <p>
              <a href="p/other2.html">下一页</a>
            </p>
          </div>
        </div>
        {srollbar()}
      </div>
    );
  }

});


module.exports =  other;

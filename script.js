var timeOut;
var Xscale=1, Yscale=1;
const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function circleMouseFollower(localXscale, localYscale){
    window.addEventListener("mousemove",function(dets){
        console.log("tttttt"+localXscale,localYscale);
        document.querySelector(".miniCircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${localXscale}, ${localYscale})`
    })
}
function firstPageAnimation(){
    var tl = gsap.timeline();

    tl.from(".nav, .boundingelemRevx",{
        y:'-12',
        opacity:0,
        duration:1.5,
        ease:Expo
    })
}
function firstPageAnimation2(){
    var tl = gsap.timeline();

    tl.to(".boundingelem",{
        y:'0',
        duration:1.5,
        ease:Expo,
        stagger:0.2
    })
}
function firstPageAnimation3(){
    var tl = gsap.timeline();

    tl.to(".boundingelemRev",{
        y:'0',
        duration:1.5,
        ease:Expo,
        stagger:0.2,
        delay:1
    })
    tl.from(".homeFooter",{
        y:'-10',
        opacity:0,
        duration:1.5,
        delay:-1.2,
        ease:Expo
    })
}

function squeezeCircle(Xscale, Yscale){
    var x=Xscale, y=Yscale;
    var prevX=0,prevY=0;
    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeOut);
        var diffX = Math.abs(dets.clientX - prevX);
        var diffY = Math.abs(dets.clientY - prevY);

        prevX = dets.clientX;
        prevY = dets.clientY;

        var Xs = gsap.utils.clamp(0.9, 1.1, diffX);
        var Ys = gsap.utils.clamp(0.9, 1.1, diffY);
        circleMouseFollower(Xs*Xscale, Ys*Yscale);
        timeOut = setTimeout(function(){
            console.log(x,y);
            document.querySelector(".miniCircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(x, y)`
        },50)
    })
}

document.querySelectorAll(".elem").forEach(function(elem){
    elem.addEventListener("mouseover",function(dets){
        var disTop = dets.clientY - elem.getBoundingClientRect().top;
        var disLeft = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:disTop,
            left:disLeft,
            rotate:0
        })
        gsap.to(".miniCircle, .miniCircle h5",{
            opacity:0.86
        })
        Xscale=6;
        Yscale=6;
        circleMouseFollower(Xscale,Yscale);
    });
    elem.addEventListener("mouseout",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power1,
            duration: 0.5,
        })
        gsap.to(".miniCircle",{
            opacity:1
        })
        gsap.to(" .miniCircle h5",{
            opacity:0
        })
        Xscale=1;
        Yscale=1;
        circleMouseFollower(Xscale,Yscale);
    });
});

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mousemove",function(dets){
        var disTop = dets.clientY - elem.getBoundingClientRect().top;
        var disLeft = dets.clientX;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:disTop,
            left:disLeft,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
        })
        setTimeout(function(){
            gsap.to(elem.querySelector("img"),{
                rotate:0
            })
        },100)
    });
    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power1,
            duration: 0.5,
        })
    });
});

squeezeCircle(Xscale,Yscale);
firstPageAnimation3();
firstPageAnimation();
firstPageAnimation2();
circleMouseFollower(Xscale,Yscale);

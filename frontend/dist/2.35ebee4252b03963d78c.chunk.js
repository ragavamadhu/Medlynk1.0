webpackJsonp([2],{P9AL:function(e,t){function n(e,t,o){this.extend(n,google.maps.OverlayView),this.map_=e,this.markers_=[],this.clusters_=[],this.sizes=[53,56,66,78,90],this.styles_=[],this.ready_=!1;var i=o||{};this.gridSize_=i.gridSize||60,this.minClusterSize_=i.minimumClusterSize||2,this.maxZoom_=i.maxZoom||null,this.styles_=i.styles||[],this.imagePath_=i.imagePath||this.MARKER_CLUSTER_IMAGE_PATH_,this.imageExtension_=i.imageExtension||this.MARKER_CLUSTER_IMAGE_EXTENSION_,this.zoomOnClick_=!0,void 0!=i.zoomOnClick&&(this.zoomOnClick_=i.zoomOnClick),this.averageCenter_=!1,void 0!=i.averageCenter&&(this.averageCenter_=i.averageCenter),this.setupStyles_(),this.setMap(e),this.prevZoom_=this.map_.getZoom();var r=this;google.maps.event.addListener(this.map_,"zoom_changed",function(){var e=r.map_.getZoom();r.prevZoom_!=e&&(r.prevZoom_=e,r.resetViewport())}),google.maps.event.addListener(this.map_,"idle",function(){r.redraw()}),t&&t.length&&this.addMarkers(t,!1)}function o(e){this.markerClusterer_=e,this.map_=e.getMap(),this.gridSize_=e.getGridSize(),this.minClusterSize_=e.getMinClusterSize(),this.averageCenter_=e.isAverageCenter(),this.center_=null,this.markers_=[],this.bounds_=null,this.clusterIcon_=new i(this,e.getStyles(),e.getGridSize())}function i(e,t,n){e.getMarkerClusterer().extend(i,google.maps.OverlayView),this.styles_=t,this.padding_=n||0,this.cluster_=e,this.center_=null,this.map_=e.getMap(),this.div_=null,this.sums_=null,this.visible_=!1,this.setMap(this.map_)}n.prototype.MARKER_CLUSTER_IMAGE_PATH_="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m",n.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_="png",n.prototype.extend=function(e,t){return function(e){for(var t in e.prototype)this.prototype[t]=e.prototype[t];return this}.apply(e,[t])},n.prototype.onAdd=function(){this.setReady_(!0)},n.prototype.draw=function(){},n.prototype.setupStyles_=function(){if(!this.styles_.length)for(var e,t=0;e=this.sizes[t];t++)this.styles_.push({url:this.imagePath_+(t+1)+"."+this.imageExtension_,height:e,width:e})},n.prototype.fitMapToMarkers=function(){for(var e,t=this.getMarkers(),n=new google.maps.LatLngBounds,o=0;e=t[o];o++)n.extend(e.getPosition());this.map_.fitBounds(n)},n.prototype.setStyles=function(e){this.styles_=e},n.prototype.getStyles=function(){return this.styles_},n.prototype.isZoomOnClick=function(){return this.zoomOnClick_},n.prototype.isAverageCenter=function(){return this.averageCenter_},n.prototype.getMarkers=function(){return this.markers_},n.prototype.getTotalMarkers=function(){return this.markers_.length},n.prototype.setMaxZoom=function(e){this.maxZoom_=e},n.prototype.getMaxZoom=function(){return this.maxZoom_},n.prototype.calculator_=function(e,t){for(var n=0,o=e.length,i=o;0!==i;)i=parseInt(i/10,10),n++;return n=Math.min(n,t),{text:o,index:n}},n.prototype.setCalculator=function(e){this.calculator_=e},n.prototype.getCalculator=function(){return this.calculator_},n.prototype.addMarkers=function(e,t){for(var n,o=0;n=e[o];o++)this.pushMarkerTo_(n);t||this.redraw()},n.prototype.pushMarkerTo_=function(e){if(e.isAdded=!1,e.draggable){var t=this;google.maps.event.addListener(e,"dragend",function(){e.isAdded=!1,t.repaint()})}this.markers_.push(e)},n.prototype.addMarker=function(e,t){this.pushMarkerTo_(e),t||this.redraw()},n.prototype.removeMarker_=function(e){var t=-1;if(this.markers_.indexOf)t=this.markers_.indexOf(e);else for(var n,o=0;n=this.markers_[o];o++)if(n==e){t=o;break}return-1!=t&&(e.setMap(null),this.markers_.splice(t,1),!0)},n.prototype.removeMarker=function(e,t){var n=this.removeMarker_(e);return!(t||!n||(this.resetViewport(),this.redraw(),0))},n.prototype.removeMarkers=function(e,t){for(var n,o=!1,i=0;n=e[i];i++){var r=this.removeMarker_(n);o=o||r}if(!t&&o)return this.resetViewport(),this.redraw(),!0},n.prototype.setReady_=function(e){this.ready_||(this.ready_=e,this.createClusters_())},n.prototype.getTotalClusters=function(){return this.clusters_.length},n.prototype.getMap=function(){return this.map_},n.prototype.setMap=function(e){this.map_=e},n.prototype.getGridSize=function(){return this.gridSize_},n.prototype.setGridSize=function(e){this.gridSize_=e},n.prototype.getMinClusterSize=function(){return this.minClusterSize_},n.prototype.setMinClusterSize=function(e){this.minClusterSize_=e},n.prototype.getExtendedBounds=function(e){var t=this.getProjection(),n=new google.maps.LatLng(e.getNorthEast().lat(),e.getNorthEast().lng()),o=new google.maps.LatLng(e.getSouthWest().lat(),e.getSouthWest().lng()),i=t.fromLatLngToDivPixel(n);i.x+=this.gridSize_,i.y-=this.gridSize_;var r=t.fromLatLngToDivPixel(o);r.x-=this.gridSize_,r.y+=this.gridSize_;var l=t.fromDivPixelToLatLng(i),s=t.fromDivPixelToLatLng(r);return e.extend(l),e.extend(s),e},n.prototype.isMarkerInBounds_=function(e,t){return t.contains(e.getPosition())},n.prototype.clearMarkers=function(){this.resetViewport(!0),this.markers_=[]},n.prototype.resetViewport=function(e){for(var t,n=0;t=this.clusters_[n];n++)t.remove();for(var o,n=0;o=this.markers_[n];n++)o.isAdded=!1,e&&o.setMap(null);this.clusters_=[]},n.prototype.repaint=function(){var e=this.clusters_.slice();this.clusters_.length=0,this.resetViewport(),this.redraw(),window.setTimeout(function(){for(var t,n=0;t=e[n];n++)t.remove()},0)},n.prototype.redraw=function(){this.createClusters_()},n.prototype.distanceBetweenPoints_=function(e,t){if(!e||!t)return 0;var n=(t.lat()-e.lat())*Math.PI/180,o=(t.lng()-e.lng())*Math.PI/180,i=Math.sin(n/2)*Math.sin(n/2)+Math.cos(e.lat()*Math.PI/180)*Math.cos(t.lat()*Math.PI/180)*Math.sin(o/2)*Math.sin(o/2);return 2*Math.atan2(Math.sqrt(i),Math.sqrt(1-i))*6371},n.prototype.addToClosestCluster_=function(e){for(var t,n=4e4,i=null,r=(e.getPosition(),0);t=this.clusters_[r];r++){var l=t.getCenter();if(l){var s=this.distanceBetweenPoints_(l,e.getPosition());s<n&&(n=s,i=t)}}if(i&&i.isMarkerInClusterBounds(e))i.addMarker(e);else{var t=new o(this);t.addMarker(e),this.clusters_.push(t)}},n.prototype.createClusters_=function(){if(this.ready_)for(var e,t=new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),this.map_.getBounds().getNorthEast()),n=this.getExtendedBounds(t),o=0;e=this.markers_[o];o++)!e.isAdded&&this.isMarkerInBounds_(e,n)&&this.addToClosestCluster_(e)},o.prototype.isMarkerAlreadyAdded=function(e){if(this.markers_.indexOf)return-1!=this.markers_.indexOf(e);for(var t,n=0;t=this.markers_[n];n++)if(t==e)return!0;return!1},o.prototype.addMarker=function(e){if(this.isMarkerAlreadyAdded(e))return!1;if(this.center_){if(this.averageCenter_){var t=this.markers_.length+1,n=(this.center_.lat()*(t-1)+e.getPosition().lat())/t,o=(this.center_.lng()*(t-1)+e.getPosition().lng())/t;this.center_=new google.maps.LatLng(n,o),this.calculateBounds_()}}else this.center_=e.getPosition(),this.calculateBounds_();e.isAdded=!0,this.markers_.push(e);var i=this.markers_.length;if(i<this.minClusterSize_&&e.getMap()!=this.map_&&e.setMap(this.map_),i==this.minClusterSize_)for(var r=0;r<i;r++)this.markers_[r].setMap(null);return i>=this.minClusterSize_&&e.setMap(null),this.updateIcon(),!0},o.prototype.getMarkerClusterer=function(){return this.markerClusterer_},o.prototype.getBounds=function(){for(var e,t=new google.maps.LatLngBounds(this.center_,this.center_),n=this.getMarkers(),o=0;e=n[o];o++)t.extend(e.getPosition());return t},o.prototype.remove=function(){this.clusterIcon_.remove(),this.markers_.length=0,delete this.markers_},o.prototype.getSize=function(){return this.markers_.length},o.prototype.getMarkers=function(){return this.markers_},o.prototype.getCenter=function(){return this.center_},o.prototype.calculateBounds_=function(){this.bounds_=this.markerClusterer_.getExtendedBounds(new google.maps.LatLngBounds(this.center_,this.center_))},o.prototype.isMarkerInClusterBounds=function(e){return this.bounds_.contains(e.getPosition())},o.prototype.getMap=function(){return this.map_},o.prototype.updateIcon=function(){var e=this.map_.getZoom(),t=this.markerClusterer_.getMaxZoom();if(t&&e>t)for(var n,o=0;n=this.markers_[o];o++)n.setMap(this.map_);else{if(this.markers_.length<this.minClusterSize_)return void this.clusterIcon_.hide();var i=this.markerClusterer_.getStyles().length,r=this.markerClusterer_.getCalculator()(this.markers_,i);this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.setSums(r),this.clusterIcon_.show()}},i.prototype.triggerClusterClick=function(){var e=this.cluster_.getMarkerClusterer();google.maps.event.trigger(e,"clusterclick",this.cluster_),e.isZoomOnClick()&&this.map_.fitBounds(this.cluster_.getBounds())},i.prototype.onAdd=function(){this.div_=document.createElement("DIV"),this.visible_&&(this.div_.style.cssText=this.createCss(this.getPosFromLatLng_(this.center_)),this.div_.innerHTML=this.sums_.text),this.getPanes().overlayMouseTarget.appendChild(this.div_);var e=this;google.maps.event.addDomListener(this.div_,"click",function(){e.triggerClusterClick()})},i.prototype.getPosFromLatLng_=function(e){var t=this.getProjection().fromLatLngToDivPixel(e);return"object"==typeof this.iconAnchor_&&2===this.iconAnchor_.length?(t.x-=this.iconAnchor_[0],t.y-=this.iconAnchor_[1]):(t.x-=parseInt(this.width_/2,10),t.y-=parseInt(this.height_/2,10)),t},i.prototype.draw=function(){if(this.visible_){var e=this.getPosFromLatLng_(this.center_);this.div_.style.top=e.y+"px",this.div_.style.left=e.x+"px"}},i.prototype.hide=function(){this.div_&&(this.div_.style.display="none"),this.visible_=!1},i.prototype.show=function(){this.div_&&(this.div_.style.cssText=this.createCss(this.getPosFromLatLng_(this.center_)),this.div_.style.display=""),this.visible_=!0},i.prototype.remove=function(){this.setMap(null)},i.prototype.onRemove=function(){this.div_&&this.div_.parentNode&&(this.hide(),this.div_.parentNode.removeChild(this.div_),this.div_=null)},i.prototype.setSums=function(e){this.sums_=e,this.text_=e.text,this.index_=e.index,this.div_&&(this.div_.innerHTML=e.text),this.useStyle()},i.prototype.useStyle=function(){var e=Math.max(0,this.sums_.index-1);e=Math.min(this.styles_.length-1,e);var t=this.styles_[e];this.url_=t.url,this.height_=t.height,this.width_=t.width,this.textColor_=t.textColor,this.anchor_=t.anchor,this.textSize_=t.textSize,this.backgroundPosition_=t.backgroundPosition,this.iconAnchor_=t.iconAnchor},i.prototype.setCenter=function(e){this.center_=e},i.prototype.createCss=function(e){var t=[];return t.push("background-image:url("+this.url_+");"),t.push("background-position:"+(this.backgroundPosition_?this.backgroundPosition_:"0 0")+";"),"object"==typeof this.anchor_?(t.push("number"==typeof this.anchor_[0]&&this.anchor_[0]>0&&this.anchor_[0]<this.height_?"height:"+(this.height_-this.anchor_[0])+"px; padding-top:"+this.anchor_[0]+"px;":"number"==typeof this.anchor_[0]&&this.anchor_[0]<0&&-this.anchor_[0]<this.height_?"height:"+this.height_+"px; line-height:"+(this.height_+this.anchor_[0])+"px;":"height:"+this.height_+"px; line-height:"+this.height_+"px;"),t.push("number"==typeof this.anchor_[1]&&this.anchor_[1]>0&&this.anchor_[1]<this.width_?"width:"+(this.width_-this.anchor_[1])+"px; padding-left:"+this.anchor_[1]+"px;":"width:"+this.width_+"px; text-align:center;")):t.push("height:"+this.height_+"px; line-height:"+this.height_+"px; width:"+this.width_+"px; text-align:center;"),t.push("cursor:pointer; top:"+e.y+"px; left:"+e.x+"px; color:"+(this.textColor_?this.textColor_:"black")+"; position:absolute; font-size:"+(this.textSize_?this.textSize_:11)+"px; font-family:Arial,sans-serif; font-weight:bold"),t.join("")},window.MarkerClusterer=n,n.prototype.addMarker=n.prototype.addMarker,n.prototype.addMarkers=n.prototype.addMarkers,n.prototype.clearMarkers=n.prototype.clearMarkers,n.prototype.fitMapToMarkers=n.prototype.fitMapToMarkers,n.prototype.getCalculator=n.prototype.getCalculator,n.prototype.getGridSize=n.prototype.getGridSize,n.prototype.getExtendedBounds=n.prototype.getExtendedBounds,n.prototype.getMap=n.prototype.getMap,n.prototype.getMarkers=n.prototype.getMarkers,n.prototype.getMaxZoom=n.prototype.getMaxZoom,n.prototype.getStyles=n.prototype.getStyles,n.prototype.getTotalClusters=n.prototype.getTotalClusters,n.prototype.getTotalMarkers=n.prototype.getTotalMarkers,n.prototype.redraw=n.prototype.redraw,n.prototype.removeMarker=n.prototype.removeMarker,n.prototype.removeMarkers=n.prototype.removeMarkers,n.prototype.resetViewport=n.prototype.resetViewport,n.prototype.repaint=n.prototype.repaint,n.prototype.setCalculator=n.prototype.setCalculator,n.prototype.setGridSize=n.prototype.setGridSize,n.prototype.setMaxZoom=n.prototype.setMaxZoom,n.prototype.onAdd=n.prototype.onAdd,n.prototype.draw=n.prototype.draw,o.prototype.getCenter=o.prototype.getCenter,o.prototype.getSize=o.prototype.getSize,o.prototype.getMarkers=o.prototype.getMarkers,i.prototype.onAdd=i.prototype.onAdd,i.prototype.draw=i.prototype.draw,i.prototype.onRemove=i.prototype.onRemove},UH1D:function(e,t,n){"use strict";function o(e){return h._28(0,[(e()(),h._7(0,null,null,3,"div",[["class","agm-info-window-content"]],null,null,null,null,null)),(e()(),h._27(null,["\n      "])),h._20(null,0),(e()(),h._27(null,["\n    "])),(e()(),h._27(null,["\n  "]))],null,null)}function i(e){return h._28(0,[(e()(),h._7(0,null,null,1,"agm-info-window",[],null,null,null,o,v)),h._5(770048,null,0,m.a,[f.a,h.k],null,null)],function(e,t){e(t,1,0)},null)}function r(e){return h._28(0,[(e()(),h._7(0,null,null,3,"option",[],null,null,null,null,null)),h._5(147456,null,0,g.o,[h.k,h.E,[2,g.r]],{value:[0,"value"]},null),h._5(147456,null,0,g.w,[h.k,h.E,[8,null]],{value:[0,"value"]},null),(e()(),h._27(null,[" \n                        ","\n                "]))],function(e,t){e(t,1,0,t.context.$implicit.label),e(t,2,0,t.context.$implicit.label)},function(e,t){e(t,3,0,t.context.$implicit.label)})}function l(e){return h._28(0,[(e()(),h._7(0,null,null,3,"option",[],null,null,null,null,null)),h._5(147456,null,0,g.o,[h.k,h.E,[2,g.r]],{value:[0,"value"]},null),h._5(147456,null,0,g.w,[h.k,h.E,[8,null]],{value:[0,"value"]},null),(e()(),h._27(null,[" \n                        ","\n                "]))],function(e,t){e(t,1,0,t.context.$implicit),e(t,2,0,t.context.$implicit)},function(e,t){e(t,3,0,t.context.$implicit)})}function s(e){return h._28(0,[(e()(),h._7(0,null,null,9,"agm-marker",[],null,[[null,"markerClick"],[null,"mouseOver"],[null,"mouseOut"]],function(e,t,n){var o=!0,i=e.component;return"markerClick"===t&&(o=!1!==i.clickedMarker(e.context.$implicit,e.context.index)&&o),"mouseOver"===t&&(o=!1!==i.mouseOver(h._21(e,5),e.context.$implicit)&&o),"mouseOut"===t&&(o=!1!==i.mouseOut(h._21(e,5),e.context.$implicit)&&o),o},null,null)),h._5(1720320,null,1,d.a,[_.a],{latitude:[0,"latitude"],longitude:[1,"longitude"],iconUrl:[2,"iconUrl"],visible:[3,"visible"]},{markerClick:"markerClick",mouseOver:"mouseOver",mouseOut:"mouseOut"}),h._25(603979776,1,{infoWindow:1}),(e()(),h._27(null,["           \n                  "])),(e()(),h._7(0,null,null,4,"agm-info-window",[],null,null,null,o,v)),h._5(770048,[[1,4],["infoWindow",4]],0,m.a,[f.a,h.k],{latitude:[0,"latitude"],longitude:[1,"longitude"],isOpen:[2,"isOpen"]},null),(e()(),h._27(0,["",""])),(e()(),h._7(0,null,0,0,"br",[],null,null,null,null,null)),(e()(),h._27(0,[" ","\n                  "])),(e()(),h._27(null,["\n          "]))],function(e,t){var n=t.component;e(t,1,0,t.context.$implicit.lat,t.context.$implicit.lng,t.context.$implicit.iconUrl,null==n.markerHidden[t.context.$implicit.label]?null:n.markerHidden[t.context.$implicit.label].val),e(t,5,0,t.context.$implicit.lat,t.context.$implicit.lng,t.context.$implicit.info)},function(e,t){e(t,6,0,t.context.$implicit.label),e(t,8,0,t.context.$implicit.message)})}function a(e){return h._28(0,[(e()(),h._7(0,null,null,58,"div",[["class","container"]],null,null,null,null,null)),(e()(),h._27(null,["\n        "])),(e()(),h._7(0,null,null,33,"div",[],null,null,null,null,null)),(e()(),h._27(null,["\n            "])),(e()(),h._7(0,null,null,14,"select",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(e,t,n){var o=!0,i=e.component;return"change"===t&&(o=!1!==h._21(e,5).onChange(n.target.value)&&o),"blur"===t&&(o=!1!==h._21(e,5).onTouched()&&o),"ngModelChange"===t&&(o=!1!==(i.selected=n)&&o),"ngModelChange"===t&&(o=!1!==i.onSelected(i.selected)&&o),o},null,null)),h._5(16384,null,0,g.r,[h.E,h.k],null,null),h._24(1024,null,g.i,function(e){return[e]},[g.r]),h._5(671744,null,0,g.n,[[8,null],[8,null],[8,null],[2,g.i]],{model:[0,"model"]},{update:"ngModelChange"}),h._24(2048,null,g.j,null,[g.n]),h._5(16384,null,0,g.k,[g.j],null,null),(e()(),h._27(null,["\n         "])),(e()(),h._7(0,null,null,3,"option",[["disabled",""],["hidden",""]],null,null,null,null,null)),h._5(147456,null,0,g.o,[h.k,h.E,[2,g.r]],{value:[0,"value"]},null),h._5(147456,null,0,g.w,[h.k,h.E,[8,null]],{value:[0,"value"]},null),(e()(),h._27(null,["Select Device Id "])),(e()(),h._27(null,["\n                "])),(e()(),h._1(16777216,null,null,1,null,r)),h._5(802816,null,0,w.i,[h.P,h.M,h.q],{ngForOf:[0,"ngForOf"]},null),(e()(),h._27(null,["\n           "])),(e()(),h._27(null,["\n        \n            "])),(e()(),h._7(0,null,null,14,"select",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(e,t,n){var o=!0,i=e.component;return"change"===t&&(o=!1!==h._21(e,21).onChange(n.target.value)&&o),"blur"===t&&(o=!1!==h._21(e,21).onTouched()&&o),"ngModelChange"===t&&(o=!1!==(i.select=n)&&o),"ngModelChange"===t&&(o=!1!==i.onSelect(i.select)&&o),o},null,null)),h._5(16384,null,0,g.r,[h.E,h.k],null,null),h._24(1024,null,g.i,function(e){return[e]},[g.r]),h._5(671744,null,0,g.n,[[8,null],[8,null],[8,null],[2,g.i]],{model:[0,"model"]},{update:"ngModelChange"}),h._24(2048,null,g.j,null,[g.n]),h._5(16384,null,0,g.k,[g.j],null,null),(e()(),h._27(null,["\n                "])),(e()(),h._7(0,null,null,3,"option",[["disabled",""],["hidden",""]],null,null,null,null,null)),h._5(147456,null,0,g.o,[h.k,h.E,[2,g.r]],{value:[0,"value"]},null),h._5(147456,null,0,g.w,[h.k,h.E,[8,null]],{value:[0,"value"]},null),(e()(),h._27(null,["Select Device Status "])),(e()(),h._27(null,["\n                "])),(e()(),h._1(16777216,null,null,1,null,l)),h._5(802816,null,0,w.i,[h.P,h.M,h.q],{ngForOf:[0,"ngForOf"]},null),(e()(),h._27(null,["\n           "])),(e()(),h._27(null,["\n        "])),(e()(),h._27(null,["\n        "])),(e()(),h._7(0,null,null,20,"agm-map",[],[[2,"sebm-google-map-container",null]],[[null,"zoomChange"]],function(e,t,n){var o=!0,i=e.component;return"zoomChange"===t&&(o=!1!==i.zoomChange(n)&&o),o},S.b,S.a)),h._24(4608,null,_.a,_.a,[b.a,h.x]),h._24(4608,null,f.a,f.a,[b.a,h.x,_.a]),h._24(4608,null,O.a,O.a,[b.a,h.x]),h._24(4608,null,z.a,z.a,[b.a,h.x]),h._24(4608,null,P.a,P.a,[b.a,h.x]),h._24(4608,null,I.a,I.a,[b.a,h.x]),h._24(4608,null,L.a,L.a,[b.a,h.x]),h._24(512,null,b.a,b.a,[D.a,h.x]),h._5(770048,null,0,E.a,[h.k,b.a],{longitude:[0,"longitude"],latitude:[1,"latitude"],zoom:[2,"zoom"],mapTypeControl:[3,"mapTypeControl"]},{zoomChange:"zoomChange"}),(e()(),h._27(0,["\n        "])),(e()(),h._7(0,null,0,8,"agm-marker-cluster",[["imagePath","https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m"]],null,null,null,null,null)),h._24(6144,null,_.a,null,[N]),h._24(4608,null,f.a,f.a,[b.a,h.x,_.a]),h._24(512,null,N,N,[b.a,h.x]),h._5(737280,null,0,B,[N],{averageCenter:[0,"averageCenter"],imagePath:[1,"imagePath"]},null),(e()(),h._27(null,["\n                "])),(e()(),h._1(16777216,null,null,1,null,s)),h._5(802816,null,0,w.i,[h.P,h.M,h.q],{ngForOf:[0,"ngForOf"]},null),(e()(),h._27(null,["\n        "])),(e()(),h._27(0,["\n        "])),(e()(),h._27(null,["\n        "]))],function(e,t){var n=t.component;e(t,7,0,n.selected),e(t,12,0,n.selectUndefinedOptionValue),e(t,13,0,n.selectUndefinedOptionValue),e(t,17,0,n.someData),e(t,23,0,n.select),e(t,28,0,n.selectUndefinedOptionValue),e(t,29,0,n.selectUndefinedOptionValue),e(t,33,0,n.options),e(t,46,0,n.lng,n.lat,n.zoomLevel,!0),e(t,52,0,!0,"https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m"),e(t,55,0,n.selectedData)},function(e,t){e(t,4,0,h._21(t,9).ngClassUntouched,h._21(t,9).ngClassTouched,h._21(t,9).ngClassPristine,h._21(t,9).ngClassDirty,h._21(t,9).ngClassValid,h._21(t,9).ngClassInvalid,h._21(t,9).ngClassPending),e(t,20,0,h._21(t,25).ngClassUntouched,h._21(t,25).ngClassTouched,h._21(t,25).ngClassPristine,h._21(t,25).ngClassDirty,h._21(t,25).ngClassValid,h._21(t,25).ngClassInvalid,h._21(t,25).ngClassPending),e(t,37,0,!0)})}function u(e){return h._28(0,[(e()(),h._7(0,null,null,1,"ng-component",[],null,null,null,a,Z)),h._5(245760,null,0,x,[k.l,C.e,R.a],null,null)],function(e,t){e(t,1,0)},null)}Object.defineProperty(t,"__esModule",{value:!0});var h=n("/oeL"),c=function(){function e(){}return e}(),p=["agm-map[_ngcontent-%COMP%]{height:580px}select[_ngcontent-%COMP%]{width:180px;height:30px;border:1px solid;font-size:15px}option[_ngcontent-%COMP%]{width:200px;height:35px}"],g=n("bm2B"),d=n("57RD"),_=n("dY6p"),m=n("MVht"),f=n("KdOF"),y=[],v=h._4({encapsulation:2,styles:y,data:{}}),k=(h._2("agm-info-window",m.a,i,{latitude:"latitude",longitude:"longitude",disableAutoPan:"disableAutoPan",zIndex:"zIndex",maxWidth:"maxWidth",isOpen:"isOpen"},{infoWindowClose:"infoWindowClose"},["*"]),n("BkNc")),M=n("5ERs"),C=(n("TbKO"),n("CPp0")),x=(n("5v8a"),function(){function e(e,t,n){this.router=e,this.http=t,this.nav=n,this.title="My first AGM project",this.lat=12.98164225,this.lng=77.59287357,this.mapID="TERRAIN",this.userId="12345",this.message="hi",this.markerOpen=!1,this.selectedVal="All",this.markerHidden={},this.thHistory={},this.options=["Red","Yellow","Green","Disconnected","All"],this.someData=[{lat:51.673858,lng:7.615982,label:"Map A",draggable:!0,value:"GREEN",iconUrl:"http://maps.google.com/mapfiles/ms/icons/green.png",message:"",info:!1},{lat:51.373858,lng:7.215982,label:"Map B",draggable:!1,value:"RED",iconUrl:"http://maps.google.com/mapfiles/ms/icons/red.png",message:"",info:!1},{lat:51.723858,lng:7.895982,label:"Map C",draggable:!0,value:"YELLOW",iconUrl:"http://maps.google.com/mapfiles/ms/icons/yellow.png",message:"",info:!1}],this.currentUser=JSON.parse(localStorage.getItem("currentUser")),void 0!=Number(JSON.parse(localStorage.getItem("zoomLevel")))&&0!=Number(JSON.parse(localStorage.getItem("zoomLevel")))||localStorage.setItem("zoomLevel",JSON.stringify(10)),this.zoomLevel=Number(JSON.parse(localStorage.getItem("zoomLevel")))}return e.prototype.ngOnInit=function(){var e=this;this.markerHidden=null!=localStorage.getItem("markerHidden")?JSON.parse(localStorage.getItem("markerHidden")):{},this.thHistory=null!=localStorage.getItem("thHistory")?JSON.parse(localStorage.getItem("thHistory")):{},null!=this.markerHidden&&null!=this.thHistory&&this.callBlinkInterval(),this.userId=JSON.parse(localStorage.getItem("currentUser")),this.getDeviceAttributes(this.userId),this.interval=setInterval(function(){e.getDeviceAttributes(e.userId)},15e3)},e.prototype.ngOnDestroy=function(){clearInterval(this.interval)},e.prototype.clickedMarker=function(e,t){this.router.navigate(["./gauges/:"+e.label]),delete this.markerHidden[e.label],delete this.thHistory[e.label],localStorage.setItem("markerHidden",JSON.stringify(this.markerHidden)),localStorage.setItem("thHistory",JSON.stringify(this.thHistory))},e.prototype.zoomChange=function(e){console.log("hi"),localStorage.setItem("zoomLevel",JSON.stringify(e)),this.zoomLevel=Number(JSON.parse(localStorage.getItem("zoomLevel")))},e.prototype.mouseOver=function(e,t){this.deviceName=t.label,this.message=t.message,e.open()},e.prototype.mouseOut=function(e,t){e.close()},e.prototype.onSelect=function(e){this.selectedVal=e,this.selectedData=this.someData.filter(function(t){return t.value==e||-1!=t.value.indexOf(e)}),"All"==e&&(this.selectedData=this.someData)},e.prototype.onSelected=function(e){for(var t=0;t<this.someData.length;t++)this.markerOpen=!1,this.someData[t].info=!1,this.someData[t].label==e&&(this.lat=this.someData[t].lat,this.lng=this.someData[t].lng,this.someData[t].info=!0)},e.prototype.callBlinkInterval=function(){var e=this;console.log("called"),clearInterval(this.markerInterval),this.markerInterval=setInterval(function(){Object.keys(Object.keys(e.markerHidden).reduce(function(t,n){return 1==e.markerHidden[n].change&&(t[n]=e.markerHidden[n].change),t},{})).map(function(t){e.markerHidden[t].val=!e.markerHidden[t].val})},500)},e.prototype.getDeviceAttributes=function(e){var t,n=this,o=[];this.http.post("/users/deviceList",{user_id:e}).map(function(e){return e.json()}).subscribe(function(e){console.log(e);for(var i=0;i<e.length;i++){"undefined"!=e[i].http_post_interval?(t=Number(e[i].http_post_interval),t>=60?t=t:t<60&&t>=30?t*=3:t>0&&t<30&&(t*=5)):(e[i].http_post_interval=0,t=5),t*=1e3,console.log("dashboard",t),"undefined"!=e[i].ang2_threshold&&"undefined"!=e[i].ang3_threshold||(e[i].ang2_threshold="DISABLE",e[i].ang3_threshold="DISABLE",e[i].ang2_lower_limit="20000",e[i].ang3_lower_limit="0");var r={},l=new Date,s=new Date(e[i].server_log_time),a=l.getTime()-s.getTime();console.log(e),console.log(e[i].server_log_time),console.log("date2",s),console.log("today",l),console.log("diffDays",a),console.log("timedif",t),t>=6e4&&(a-=5e4),console.log("diffDays after subtract",a);var u,h,c,p=e[i].device_id,g=e[i].gas_level,d=e[i].gas_detector;if(console.log(n.thHistory),-1!=Object.keys(n.thHistory).indexOf(e[i].device_id)){var _=n.thHistory[e[i].device_id].split("").map(function(e){return Number(e)}),m=e[i].th.split("").map(function(e){return Number(e)});console.log(_,m),(0==_[1]&&1==m[1]||1==_[2]&&0==m[2]||1==_[3]&&0==m[3]||1==_[4]&&0==m[4]||1==_[5]&&0==m[5])&&(n.markerHidden[e[i].device_id]={val:!0,change:!0},console.log("changed",n.markerHidden),localStorage.setItem("markerHidden",JSON.stringify(n.markerHidden)),localStorage.setItem("thHistory",JSON.stringify(n.thHistory)),n.callBlinkInterval())}n.thHistory[e[i].device_id]=e[i].th,n.tankLevel=Math.round(20*Number(g)),n.GasLeak=Number(d)>4?Math.round(6.25*(Number(d)-4)):0,n.powerSupply=Math.round(8.33*Number(e[i].power_level)),1==e[i].gas_leak||null!=e[i].ang2_threshold&&"ENABLE"==e[i].ang2_threshold&&null!=e[i].ang2_lower_limit&&1e3*Number(e[i].gas_detector)>Number(e[i].ang2_lower_limit)?(u="Red",c="Gas Leak",h=M.a.imagePath+"redmarker.png",a>t&&(u="Disconnected,Red",c="Gas Leak and Disconnected",h=M.a.imagePath+"redmarkerdisconnected.png")):1==e[i].low_gas||null!=e[i].ang3_threshold&&"ENABLE"==e[i].ang3_threshold&&null!=e[i].ang3_lower_limit&&1e3*Number(e[i].gas_level)<Number(e[i].ang3_lower_limit)?(u="Yellow",c="Low Gas",h=M.a.imagePath+"yellow.png",n.powerSupply<75?(u="Red",c="Low Power Level",console.log("low power hit"),h=M.a.imagePath+"redmarker.png",console.log("checking time"),console.log("last time dif",a),console.log("timediff",t),a>t&&(console.log("disconnected"),c="Low Gas,Low Power and Disconnected",u="Disconnected,Red",h=M.a.imagePath+"redmarkerdisconnected.png")):a>t&&(c="Low Gas and Disconnected",u="Disconnected,Yellow",h=M.a.imagePath+"yellowmarkerdisconnected.png",n.powerSupply<75&&(u="Disconnected,Red",c="Low Power Level",h=M.a.imagePath+"redmarkerdisconnected.png"))):(u="Green",c="All Good ",h=M.a.imagePath+"greenmarker.png",n.powerSupply<75?(u="Red",c="Low Power Level",h=M.a.imagePath+"redmarker.png",a>=t&&(u="Disconnected,Red",c="Low Power Level and Disconnected",h=M.a.imagePath+"redmarkerdisconnected.png")):n.powerSupply>=75?(u="Green",h=M.a.imagePath+"greenmarker.png",a>t&&(u="Green,Disconnected",c="Disconnected",h=M.a.imagePath+"greenmarkerdisconnected.png")):a>t&&(u="Green,Disconnected",c="Disconnected",h=M.a.imagePath+"greenmarkerdisconnected.png"));var f=e[i].coordinates,f=f.split(","),y=f[0],v=f[1];r.lat=Number(y),r.lng=Number(v),r.label=p,r.value=u,r.iconUrl=h,r.message="Status: "+c,r.info=!1,o.push(r),0==i&&(n.lat=Number(y),n.lng=Number(v))}JSON.stringify(o),n.someData=JSON.parse(JSON.stringify(o)),n.selectedData=n.someData.filter(function(e){return e.value==n.selectedVal||-1!=e.value.indexOf(n.selectedVal)}),"All"==n.selectedVal&&(n.selectedData=n.someData)},function(e){console.log("Oooops!"+e)})},e}()),w=n("qbdv"),S=n("9U4N"),b=n("BfPg"),O=n("DCX4"),z=n("Ds4W"),P=n("9fk+"),I=n("mECe"),L=n("7PDj"),D=n("wW3n"),E=n("t+Rn"),A=(n("P9AL"),this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}()),N=function(e){function t(t,n){var o=e.call(this,t,n)||this;return o._mapsWrapper=t,o._zone=n,o._clustererInstance=new Promise(function(e){o._resolver=e}),o}return A(t,e),t.prototype.init=function(e){var t=this;this._mapsWrapper.getNativeMap().then(function(n){var o=new MarkerClusterer(n,[],e);t._resolver(o)})},t.prototype.addMarker=function(e){var t=this._clustererInstance,n=this._mapsWrapper.createMarker({position:{lat:e.latitude,lng:e.longitude},label:e.label,draggable:e.draggable,icon:e.iconUrl,opacity:e.opacity,visible:e.visible,zIndex:e.zIndex,title:e.title,clickable:e.clickable},!1);Promise.all([t,n]).then(function(e){return e[0].addMarker(e[1])}),this._markers.set(e,n)},t.prototype.deleteMarker=function(e){var t=this,n=this._markers.get(e);return null==n?Promise.resolve():n.then(function(n){t._zone.run(function(){n.setMap(null),t._clustererInstance.then(function(o){o.removeMarker(n),t._markers.delete(e)})})})},t.prototype.clearMarkers=function(){return this._clustererInstance.then(function(e){e.clearMarkers()})},t.prototype.setGridSize=function(e){this._clustererInstance.then(function(t){t.setGridSize(e.gridSize)})},t.prototype.setMaxZoom=function(e){this._clustererInstance.then(function(t){t.setMaxZoom(e.maxZoom)})},t.prototype.setStyles=function(e){this._clustererInstance.then(function(t){t.setStyles(e.styles)})},t.prototype.setZoomOnClick=function(e){this._clustererInstance.then(function(t){void 0!==e.zoomOnClick&&(t.zoomOnClick_=e.zoomOnClick)})},t.prototype.setAverageCenter=function(e){this._clustererInstance.then(function(t){void 0!==e.averageCenter&&(t.averageCenter_=e.averageCenter)})},t.prototype.setImagePath=function(e){this._clustererInstance.then(function(t){void 0!==e.imagePath&&(t.imagePath_=e.imagePath)})},t.prototype.setMinimumClusterSize=function(e){this._clustererInstance.then(function(t){void 0!==e.minimumClusterSize&&(t.minimumClusterSize_=e.minimumClusterSize)})},t.prototype.setImageExtension=function(e){this._clustererInstance.then(function(t){void 0!==e.imageExtension&&(t.imageExtension_=e.imageExtension)})},t}(_.a),T=(n("Da1i"),n("NhXU"),n("Nrw8"),n("ftnM"),n("1s5s"),n("u7vS"),n("wvx+")),H=(function(){function e(){}e.prototype.load=function(){if(!window.google||!window.google.maps)throw new Error("Google Maps API not loaded on page. Make sure window.google.maps is available!");return Promise.resolve()}}(),n("q+Vp")),B=function(){function e(e){this._clusterManager=e}return e.prototype.ngOnDestroy=function(){this._clusterManager.clearMarkers()},e.prototype.ngOnChanges=function(e){e.gridSize&&this._clusterManager.setGridSize(this),e.maxZoom&&this._clusterManager.setMaxZoom(this),e.styles&&this._clusterManager.setStyles(this),e.zoomOnClick&&this._clusterManager.setZoomOnClick(this),e.averageCenter&&this._clusterManager.setAverageCenter(this),e.minimumClusterSize&&this._clusterManager.setMinimumClusterSize(this),e.styles&&this._clusterManager.setStyles(this),e.imagePath&&this._clusterManager.setImagePath(this),e.imageExtension&&this._clusterManager.setImageExtension(this)},e.prototype.ngOnInit=function(){this._clusterManager.init({gridSize:this.gridSize,maxZoom:this.maxZoom,zoomOnClick:this.zoomOnClick,averageCenter:this.averageCenter,minimumClusterSize:this.minimumClusterSize,styles:this.styles,imagePath:this.imagePath,imageExtension:this.imageExtension})},e}(),R=n("EDb1"),G=[p],Z=h._4({encapsulation:0,styles:G,data:{}}),U=h._2("ng-component",x,u,{},{},[]),V=n("niyx"),j=function(){function e(){}return e}();n.d(t,"DashboardModuleNgFactory",function(){return J});var J=h._3(c,[],function(e){return h._18([h._19(512,h.j,h.Z,[[8,[U]],[3,h.j],h.v]),h._19(4608,g.v,g.v,[]),h._19(4608,w.l,w.k,[h.s]),h._19(4608,V.c,V.c,[]),h._19(4608,V.b,V.b,[]),h._19(4608,D.a,T.b,[T.a,V.c,V.b]),h._19(512,H.a,H.a,[]),h._19(512,j,j,[]),h._19(512,g.t,g.t,[]),h._19(512,g.e,g.e,[]),h._19(512,w.b,w.b,[]),h._19(512,k.o,k.o,[[2,k.t],[2,k.l]]),h._19(512,c,c,[]),h._19(1024,k.j,function(){return[[{path:"",component:x}]]},[]),h._19(256,T.a,{apiKey:"AIzaSyCJ8L3mMI-DQ_3xoh6DR78Os7qtUsVuT1k"},[])])})}});
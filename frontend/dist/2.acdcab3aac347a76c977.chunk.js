webpackJsonp([2],{P9AL:function(e,t){function n(e,t,i){this.extend(n,google.maps.OverlayView),this.map_=e,this.markers_=[],this.clusters_=[],this.sizes=[53,56,66,78,90],this.styles_=[],this.ready_=!1;var o=i||{};this.gridSize_=o.gridSize||60,this.minClusterSize_=o.minimumClusterSize||2,this.maxZoom_=o.maxZoom||null,this.styles_=o.styles||[],this.imagePath_=o.imagePath||this.MARKER_CLUSTER_IMAGE_PATH_,this.imageExtension_=o.imageExtension||this.MARKER_CLUSTER_IMAGE_EXTENSION_,this.zoomOnClick_=!0,void 0!=o.zoomOnClick&&(this.zoomOnClick_=o.zoomOnClick),this.averageCenter_=!1,void 0!=o.averageCenter&&(this.averageCenter_=o.averageCenter),this.setupStyles_(),this.setMap(e),this.prevZoom_=this.map_.getZoom();var l=this;google.maps.event.addListener(this.map_,"zoom_changed",function(){var e=l.map_.getZoom();l.prevZoom_!=e&&(l.prevZoom_=e,l.resetViewport())}),google.maps.event.addListener(this.map_,"idle",function(){l.redraw()}),t&&t.length&&this.addMarkers(t,!1)}function i(e){this.markerClusterer_=e,this.map_=e.getMap(),this.gridSize_=e.getGridSize(),this.minClusterSize_=e.getMinClusterSize(),this.averageCenter_=e.isAverageCenter(),this.center_=null,this.markers_=[],this.bounds_=null,this.clusterIcon_=new o(this,e.getStyles(),e.getGridSize())}function o(e,t,n){e.getMarkerClusterer().extend(o,google.maps.OverlayView),this.styles_=t,this.padding_=n||0,this.cluster_=e,this.center_=null,this.map_=e.getMap(),this.div_=null,this.sums_=null,this.visible_=!1,this.setMap(this.map_)}n.prototype.MARKER_CLUSTER_IMAGE_PATH_="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m",n.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_="png",n.prototype.extend=function(e,t){return function(e){for(var t in e.prototype)this.prototype[t]=e.prototype[t];return this}.apply(e,[t])},n.prototype.onAdd=function(){this.setReady_(!0)},n.prototype.draw=function(){},n.prototype.setupStyles_=function(){if(!this.styles_.length)for(var e,t=0;e=this.sizes[t];t++)this.styles_.push({url:this.imagePath_+(t+1)+"."+this.imageExtension_,height:e,width:e})},n.prototype.fitMapToMarkers=function(){for(var e,t=this.getMarkers(),n=new google.maps.LatLngBounds,i=0;e=t[i];i++)n.extend(e.getPosition());this.map_.fitBounds(n)},n.prototype.setStyles=function(e){this.styles_=e},n.prototype.getStyles=function(){return this.styles_},n.prototype.isZoomOnClick=function(){return this.zoomOnClick_},n.prototype.isAverageCenter=function(){return this.averageCenter_},n.prototype.getMarkers=function(){return this.markers_},n.prototype.getTotalMarkers=function(){return this.markers_.length},n.prototype.setMaxZoom=function(e){this.maxZoom_=e},n.prototype.getMaxZoom=function(){return this.maxZoom_},n.prototype.calculator_=function(e,t){for(var n=0,i=e.length,o=i;0!==o;)o=parseInt(o/10,10),n++;return n=Math.min(n,t),{text:i,index:n}},n.prototype.setCalculator=function(e){this.calculator_=e},n.prototype.getCalculator=function(){return this.calculator_},n.prototype.addMarkers=function(e,t){for(var n,i=0;n=e[i];i++)this.pushMarkerTo_(n);t||this.redraw()},n.prototype.pushMarkerTo_=function(e){if(e.isAdded=!1,e.draggable){var t=this;google.maps.event.addListener(e,"dragend",function(){e.isAdded=!1,t.repaint()})}this.markers_.push(e)},n.prototype.addMarker=function(e,t){this.pushMarkerTo_(e),t||this.redraw()},n.prototype.removeMarker_=function(e){var t=-1;if(this.markers_.indexOf)t=this.markers_.indexOf(e);else for(var n,i=0;n=this.markers_[i];i++)if(n==e){t=i;break}return-1!=t&&(e.setMap(null),this.markers_.splice(t,1),!0)},n.prototype.removeMarker=function(e,t){var n=this.removeMarker_(e);return!(t||!n||(this.resetViewport(),this.redraw(),0))},n.prototype.removeMarkers=function(e,t){for(var n,i=!1,o=0;n=e[o];o++){var l=this.removeMarker_(n);i=i||l}if(!t&&i)return this.resetViewport(),this.redraw(),!0},n.prototype.setReady_=function(e){this.ready_||(this.ready_=e,this.createClusters_())},n.prototype.getTotalClusters=function(){return this.clusters_.length},n.prototype.getMap=function(){return this.map_},n.prototype.setMap=function(e){this.map_=e},n.prototype.getGridSize=function(){return this.gridSize_},n.prototype.setGridSize=function(e){this.gridSize_=e},n.prototype.getMinClusterSize=function(){return this.minClusterSize_},n.prototype.setMinClusterSize=function(e){this.minClusterSize_=e},n.prototype.getExtendedBounds=function(e){var t=this.getProjection(),n=new google.maps.LatLng(e.getNorthEast().lat(),e.getNorthEast().lng()),i=new google.maps.LatLng(e.getSouthWest().lat(),e.getSouthWest().lng()),o=t.fromLatLngToDivPixel(n);o.x+=this.gridSize_,o.y-=this.gridSize_;var l=t.fromLatLngToDivPixel(i);l.x-=this.gridSize_,l.y+=this.gridSize_;var r=t.fromDivPixelToLatLng(o),s=t.fromDivPixelToLatLng(l);return e.extend(r),e.extend(s),e},n.prototype.isMarkerInBounds_=function(e,t){return t.contains(e.getPosition())},n.prototype.clearMarkers=function(){this.resetViewport(!0),this.markers_=[]},n.prototype.resetViewport=function(e){for(var t,n=0;t=this.clusters_[n];n++)t.remove();for(var i,n=0;i=this.markers_[n];n++)i.isAdded=!1,e&&i.setMap(null);this.clusters_=[]},n.prototype.repaint=function(){var e=this.clusters_.slice();this.clusters_.length=0,this.resetViewport(),this.redraw(),window.setTimeout(function(){for(var t,n=0;t=e[n];n++)t.remove()},0)},n.prototype.redraw=function(){this.createClusters_()},n.prototype.distanceBetweenPoints_=function(e,t){if(!e||!t)return 0;var n=(t.lat()-e.lat())*Math.PI/180,i=(t.lng()-e.lng())*Math.PI/180,o=Math.sin(n/2)*Math.sin(n/2)+Math.cos(e.lat()*Math.PI/180)*Math.cos(t.lat()*Math.PI/180)*Math.sin(i/2)*Math.sin(i/2);return 2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o))*6371},n.prototype.addToClosestCluster_=function(e){for(var t,n=4e4,o=null,l=(e.getPosition(),0);t=this.clusters_[l];l++){var r=t.getCenter();if(r){var s=this.distanceBetweenPoints_(r,e.getPosition());s<n&&(n=s,o=t)}}if(o&&o.isMarkerInClusterBounds(e))o.addMarker(e);else{var t=new i(this);t.addMarker(e),this.clusters_.push(t)}},n.prototype.createClusters_=function(){if(this.ready_)for(var e,t=new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),this.map_.getBounds().getNorthEast()),n=this.getExtendedBounds(t),i=0;e=this.markers_[i];i++)!e.isAdded&&this.isMarkerInBounds_(e,n)&&this.addToClosestCluster_(e)},i.prototype.isMarkerAlreadyAdded=function(e){if(this.markers_.indexOf)return-1!=this.markers_.indexOf(e);for(var t,n=0;t=this.markers_[n];n++)if(t==e)return!0;return!1},i.prototype.addMarker=function(e){if(this.isMarkerAlreadyAdded(e))return!1;if(this.center_){if(this.averageCenter_){var t=this.markers_.length+1,n=(this.center_.lat()*(t-1)+e.getPosition().lat())/t,i=(this.center_.lng()*(t-1)+e.getPosition().lng())/t;this.center_=new google.maps.LatLng(n,i),this.calculateBounds_()}}else this.center_=e.getPosition(),this.calculateBounds_();e.isAdded=!0,this.markers_.push(e);var o=this.markers_.length;if(o<this.minClusterSize_&&e.getMap()!=this.map_&&e.setMap(this.map_),o==this.minClusterSize_)for(var l=0;l<o;l++)this.markers_[l].setMap(null);return o>=this.minClusterSize_&&e.setMap(null),this.updateIcon(),!0},i.prototype.getMarkerClusterer=function(){return this.markerClusterer_},i.prototype.getBounds=function(){for(var e,t=new google.maps.LatLngBounds(this.center_,this.center_),n=this.getMarkers(),i=0;e=n[i];i++)t.extend(e.getPosition());return t},i.prototype.remove=function(){this.clusterIcon_.remove(),this.markers_.length=0,delete this.markers_},i.prototype.getSize=function(){return this.markers_.length},i.prototype.getMarkers=function(){return this.markers_},i.prototype.getCenter=function(){return this.center_},i.prototype.calculateBounds_=function(){this.bounds_=this.markerClusterer_.getExtendedBounds(new google.maps.LatLngBounds(this.center_,this.center_))},i.prototype.isMarkerInClusterBounds=function(e){return this.bounds_.contains(e.getPosition())},i.prototype.getMap=function(){return this.map_},i.prototype.updateIcon=function(){var e=this.map_.getZoom(),t=this.markerClusterer_.getMaxZoom();if(t&&e>t)for(var n,i=0;n=this.markers_[i];i++)n.setMap(this.map_);else{if(this.markers_.length<this.minClusterSize_)return void this.clusterIcon_.hide();var o=this.markerClusterer_.getStyles().length,l=this.markerClusterer_.getCalculator()(this.markers_,o);this.clusterIcon_.setCenter(this.center_),this.clusterIcon_.setSums(l),this.clusterIcon_.show()}},o.prototype.triggerClusterClick=function(){var e=this.cluster_.getMarkerClusterer();google.maps.event.trigger(e,"clusterclick",this.cluster_),e.isZoomOnClick()&&this.map_.fitBounds(this.cluster_.getBounds())},o.prototype.onAdd=function(){this.div_=document.createElement("DIV"),this.visible_&&(this.div_.style.cssText=this.createCss(this.getPosFromLatLng_(this.center_)),this.div_.innerHTML=this.sums_.text),this.getPanes().overlayMouseTarget.appendChild(this.div_);var e=this;google.maps.event.addDomListener(this.div_,"click",function(){e.triggerClusterClick()})},o.prototype.getPosFromLatLng_=function(e){var t=this.getProjection().fromLatLngToDivPixel(e);return"object"==typeof this.iconAnchor_&&2===this.iconAnchor_.length?(t.x-=this.iconAnchor_[0],t.y-=this.iconAnchor_[1]):(t.x-=parseInt(this.width_/2,10),t.y-=parseInt(this.height_/2,10)),t},o.prototype.draw=function(){if(this.visible_){var e=this.getPosFromLatLng_(this.center_);this.div_.style.top=e.y+"px",this.div_.style.left=e.x+"px"}},o.prototype.hide=function(){this.div_&&(this.div_.style.display="none"),this.visible_=!1},o.prototype.show=function(){this.div_&&(this.div_.style.cssText=this.createCss(this.getPosFromLatLng_(this.center_)),this.div_.style.display=""),this.visible_=!0},o.prototype.remove=function(){this.setMap(null)},o.prototype.onRemove=function(){this.div_&&this.div_.parentNode&&(this.hide(),this.div_.parentNode.removeChild(this.div_),this.div_=null)},o.prototype.setSums=function(e){this.sums_=e,this.text_=e.text,this.index_=e.index,this.div_&&(this.div_.innerHTML=e.text),this.useStyle()},o.prototype.useStyle=function(){var e=Math.max(0,this.sums_.index-1);e=Math.min(this.styles_.length-1,e);var t=this.styles_[e];this.url_=t.url,this.height_=t.height,this.width_=t.width,this.textColor_=t.textColor,this.anchor_=t.anchor,this.textSize_=t.textSize,this.backgroundPosition_=t.backgroundPosition,this.iconAnchor_=t.iconAnchor},o.prototype.setCenter=function(e){this.center_=e},o.prototype.createCss=function(e){var t=[];return t.push("background-image:url("+this.url_+");"),t.push("background-position:"+(this.backgroundPosition_?this.backgroundPosition_:"0 0")+";"),"object"==typeof this.anchor_?(t.push("number"==typeof this.anchor_[0]&&this.anchor_[0]>0&&this.anchor_[0]<this.height_?"height:"+(this.height_-this.anchor_[0])+"px; padding-top:"+this.anchor_[0]+"px;":"number"==typeof this.anchor_[0]&&this.anchor_[0]<0&&-this.anchor_[0]<this.height_?"height:"+this.height_+"px; line-height:"+(this.height_+this.anchor_[0])+"px;":"height:"+this.height_+"px; line-height:"+this.height_+"px;"),t.push("number"==typeof this.anchor_[1]&&this.anchor_[1]>0&&this.anchor_[1]<this.width_?"width:"+(this.width_-this.anchor_[1])+"px; padding-left:"+this.anchor_[1]+"px;":"width:"+this.width_+"px; text-align:center;")):t.push("height:"+this.height_+"px; line-height:"+this.height_+"px; width:"+this.width_+"px; text-align:center;"),t.push("cursor:pointer; top:"+e.y+"px; left:"+e.x+"px; color:"+(this.textColor_?this.textColor_:"black")+"; position:absolute; font-size:"+(this.textSize_?this.textSize_:11)+"px; font-family:Arial,sans-serif; font-weight:bold"),t.join("")},window.MarkerClusterer=n,n.prototype.addMarker=n.prototype.addMarker,n.prototype.addMarkers=n.prototype.addMarkers,n.prototype.clearMarkers=n.prototype.clearMarkers,n.prototype.fitMapToMarkers=n.prototype.fitMapToMarkers,n.prototype.getCalculator=n.prototype.getCalculator,n.prototype.getGridSize=n.prototype.getGridSize,n.prototype.getExtendedBounds=n.prototype.getExtendedBounds,n.prototype.getMap=n.prototype.getMap,n.prototype.getMarkers=n.prototype.getMarkers,n.prototype.getMaxZoom=n.prototype.getMaxZoom,n.prototype.getStyles=n.prototype.getStyles,n.prototype.getTotalClusters=n.prototype.getTotalClusters,n.prototype.getTotalMarkers=n.prototype.getTotalMarkers,n.prototype.redraw=n.prototype.redraw,n.prototype.removeMarker=n.prototype.removeMarker,n.prototype.removeMarkers=n.prototype.removeMarkers,n.prototype.resetViewport=n.prototype.resetViewport,n.prototype.repaint=n.prototype.repaint,n.prototype.setCalculator=n.prototype.setCalculator,n.prototype.setGridSize=n.prototype.setGridSize,n.prototype.setMaxZoom=n.prototype.setMaxZoom,n.prototype.onAdd=n.prototype.onAdd,n.prototype.draw=n.prototype.draw,i.prototype.getCenter=i.prototype.getCenter,i.prototype.getSize=i.prototype.getSize,i.prototype.getMarkers=i.prototype.getMarkers,o.prototype.onAdd=o.prototype.onAdd,o.prototype.draw=o.prototype.draw,o.prototype.onRemove=o.prototype.onRemove},UH1D:function(e,t,n){"use strict";function i(e){return g._28(0,[(e()(),g._7(0,null,null,3,"div",[["class","agm-info-window-content"]],null,null,null,null,null)),(e()(),g._27(null,["\n      "])),g._20(null,0),(e()(),g._27(null,["\n    "])),(e()(),g._27(null,["\n  "]))],null,null)}function o(e){return g._28(0,[(e()(),g._7(0,null,null,1,"agm-info-window",[],null,null,null,i,M)),g._5(770048,null,0,y.a,[k.a,g.k],null,null)],function(e,t){e(t,1,0)},null)}function l(e){return g._28(0,[(e()(),g._7(0,null,null,3,"option",[],null,null,null,null,null)),g._5(147456,null,0,m.o,[g.k,g.E,[2,m.r]],{value:[0,"value"]},null),g._5(147456,null,0,m.w,[g.k,g.E,[8,null]],{value:[0,"value"]},null),(e()(),g._27(null,[" \n                        ","\n                "]))],function(e,t){e(t,1,0,t.context.$implicit.label),e(t,2,0,t.context.$implicit.label)},function(e,t){e(t,3,0,t.context.$implicit.label)})}function r(e){return g._28(0,[(e()(),g._7(0,null,null,3,"option",[],null,null,null,null,null)),g._5(147456,null,0,m.o,[g.k,g.E,[2,m.r]],{value:[0,"value"]},null),g._5(147456,null,0,m.w,[g.k,g.E,[8,null]],{value:[0,"value"]},null),(e()(),g._27(null,[" \n                        ","\n                "]))],function(e,t){e(t,1,0,t.context.$implicit),e(t,2,0,t.context.$implicit)},function(e,t){e(t,3,0,t.context.$implicit)})}function s(e){return g._28(0,[(e()(),g._7(0,null,null,9,"agm-marker",[],null,[[null,"markerClick"],[null,"mouseOver"],[null,"mouseOut"]],function(e,t,n){var i=!0,o=e.component;return"markerClick"===t&&(i=!1!==o.clickedMarker(e.context.$implicit,e.context.index)&&i),"mouseOver"===t&&(i=!1!==o.mouseOver(g._21(e,5),e.context.$implicit)&&i),"mouseOut"===t&&(i=!1!==o.mouseOut(g._21(e,5),e.context.$implicit)&&i),i},null,null)),g._5(1720320,null,1,f.a,[v.a],{latitude:[0,"latitude"],longitude:[1,"longitude"],iconUrl:[2,"iconUrl"],visible:[3,"visible"]},{markerClick:"markerClick",mouseOver:"mouseOver",mouseOut:"mouseOut"}),g._25(603979776,1,{infoWindow:1}),(e()(),g._27(null,["           \n                  "])),(e()(),g._7(0,null,null,4,"agm-info-window",[],null,null,null,i,M)),g._5(770048,[[1,4],["infoWindow",4]],0,y.a,[k.a,g.k],{latitude:[0,"latitude"],longitude:[1,"longitude"],isOpen:[2,"isOpen"]},null),(e()(),g._27(0,["",""])),(e()(),g._7(0,null,0,0,"br",[],null,null,null,null,null)),(e()(),g._27(0,[" ","\n                  "])),(e()(),g._27(null,["\n          "]))],function(e,t){var n=t.component;e(t,1,0,t.context.$implicit.lat,t.context.$implicit.lng,t.context.$implicit.iconUrl,null==n.markerHidden[t.context.$implicit.label]?null:n.markerHidden[t.context.$implicit.label].val),e(t,5,0,t.context.$implicit.lat,t.context.$implicit.lng,t.context.$implicit.info)},function(e,t){e(t,6,0,t.context.$implicit.label),e(t,8,0,t.context.$implicit.message)})}function a(e){return g._28(0,[(e()(),g._7(0,null,null,20,"agm-map",[],[[2,"sebm-google-map-container",null]],[[null,"zoomChange"]],function(e,t,n){var i=!0,o=e.component;return"zoomChange"===t&&(i=!1!==o.zoomChange(n)&&i),i},C.b,C.a)),g._24(4608,null,v.a,v.a,[S.a,g.x]),g._24(4608,null,k.a,k.a,[S.a,g.x,v.a]),g._24(4608,null,w.a,w.a,[S.a,g.x]),g._24(4608,null,b.a,b.a,[S.a,g.x]),g._24(4608,null,O.a,O.a,[S.a,g.x]),g._24(4608,null,z.a,z.a,[S.a,g.x]),g._24(4608,null,P.a,P.a,[S.a,g.x]),g._24(512,null,S.a,S.a,[I.a,g.x]),g._5(770048,null,0,L.a,[g.k,S.a],{longitude:[0,"longitude"],latitude:[1,"latitude"],zoom:[2,"zoom"],mapTypeControl:[3,"mapTypeControl"]},{zoomChange:"zoomChange"}),(e()(),g._27(0,["\n        "])),(e()(),g._7(0,null,0,8,"agm-marker-cluster",[["imagePath","https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m"]],null,null,null,null,null)),g._24(6144,null,v.a,null,[N]),g._24(4608,null,k.a,k.a,[S.a,g.x,v.a]),g._24(512,null,N,N,[S.a,g.x]),g._5(737280,null,0,T,[N],{averageCenter:[0,"averageCenter"],imagePath:[1,"imagePath"]},null),(e()(),g._27(null,["\n           "])),(e()(),g._1(16777216,null,null,1,null,s)),g._5(802816,null,0,H.i,[g.P,g.M,g.q],{ngForOf:[0,"ngForOf"]},null),(e()(),g._27(null,["\n        "])),(e()(),g._27(0,["\n        "]))],function(e,t){var n=t.component;e(t,9,0,n.lng,n.lat,n.zoomLevel,!0),e(t,15,0,!0,"https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m"),e(t,18,0,n.selectedData)},function(e,t){e(t,0,0,!0)})}function u(e){return g._28(0,[(e()(),g._7(0,null,null,9,"agm-marker",[],null,[[null,"markerClick"],[null,"mouseOver"],[null,"mouseOut"]],function(e,t,n){var i=!0,o=e.component;return"markerClick"===t&&(i=!1!==o.clickedMarker(e.context.$implicit,e.context.index)&&i),"mouseOver"===t&&(i=!1!==o.mouseOver(g._21(e,5),e.context.$implicit)&&i),"mouseOut"===t&&(i=!1!==o.mouseOut(g._21(e,5),e.context.$implicit)&&i),i},null,null)),g._5(1720320,null,1,f.a,[v.a],{latitude:[0,"latitude"],longitude:[1,"longitude"],iconUrl:[2,"iconUrl"],visible:[3,"visible"]},{markerClick:"markerClick",mouseOver:"mouseOver",mouseOut:"mouseOut"}),g._25(603979776,2,{infoWindow:1}),(e()(),g._27(null,["           \n                          "])),(e()(),g._7(0,null,null,4,"agm-info-window",[],null,null,null,i,M)),g._5(770048,[[2,4],["infoWindow",4]],0,y.a,[k.a,g.k],{latitude:[0,"latitude"],longitude:[1,"longitude"],isOpen:[2,"isOpen"]},null),(e()(),g._27(0,["",""])),(e()(),g._7(0,null,0,0,"br",[],null,null,null,null,null)),(e()(),g._27(0,[" ","\n                          "])),(e()(),g._27(null,["\n                  "]))],function(e,t){var n=t.component;e(t,1,0,t.context.$implicit.lat,t.context.$implicit.lng,t.context.$implicit.iconUrl,null==n.markerHidden[t.context.$implicit.label]?null:n.markerHidden[t.context.$implicit.label].val),e(t,5,0,t.context.$implicit.lat,t.context.$implicit.lng,t.context.$implicit.info)},function(e,t){e(t,6,0,t.context.$implicit.label),e(t,8,0,t.context.$implicit.message)})}function c(e){return g._28(0,[(e()(),g._7(0,null,null,13,"agm-map",[],[[2,"sebm-google-map-container",null]],[[null,"zoomChange"]],function(e,t,n){var i=!0,o=e.component;return"zoomChange"===t&&(i=!1!==o.zoomChange(n)&&i),i},C.b,C.a)),g._24(4608,null,v.a,v.a,[S.a,g.x]),g._24(4608,null,k.a,k.a,[S.a,g.x,v.a]),g._24(4608,null,w.a,w.a,[S.a,g.x]),g._24(4608,null,b.a,b.a,[S.a,g.x]),g._24(4608,null,O.a,O.a,[S.a,g.x]),g._24(4608,null,z.a,z.a,[S.a,g.x]),g._24(4608,null,P.a,P.a,[S.a,g.x]),g._24(512,null,S.a,S.a,[I.a,g.x]),g._5(770048,null,0,L.a,[g.k,S.a],{longitude:[0,"longitude"],latitude:[1,"latitude"],zoom:[2,"zoom"],mapTypeControl:[3,"mapTypeControl"]},{zoomChange:"zoomChange"}),(e()(),g._27(0,["\n                   "])),(e()(),g._1(16777216,null,0,1,null,u)),g._5(802816,null,0,H.i,[g.P,g.M,g.q],{ngForOf:[0,"ngForOf"]},null),(e()(),g._27(0,["\n        "]))],function(e,t){var n=t.component;e(t,9,0,n.lng,n.lat,n.zoomLevel,!0),e(t,12,0,n.selectedData)},function(e,t){e(t,0,0,!0)})}function h(e){return g._28(0,[(e()(),g._7(0,null,null,42,"div",[["class","container"]],null,null,null,null,null)),(e()(),g._27(null,["\n        "])),(e()(),g._7(0,null,null,33,"div",[],null,null,null,null,null)),(e()(),g._27(null,["\n            "])),(e()(),g._7(0,null,null,14,"select",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(e,t,n){var i=!0,o=e.component;return"change"===t&&(i=!1!==g._21(e,5).onChange(n.target.value)&&i),"blur"===t&&(i=!1!==g._21(e,5).onTouched()&&i),"ngModelChange"===t&&(i=!1!==(o.selected=n)&&i),"ngModelChange"===t&&(i=!1!==o.onSelected(o.selected)&&i),i},null,null)),g._5(16384,null,0,m.r,[g.E,g.k],null,null),g._24(1024,null,m.i,function(e){return[e]},[m.r]),g._5(671744,null,0,m.n,[[8,null],[8,null],[8,null],[2,m.i]],{model:[0,"model"]},{update:"ngModelChange"}),g._24(2048,null,m.j,null,[m.n]),g._5(16384,null,0,m.k,[m.j],null,null),(e()(),g._27(null,["\n         "])),(e()(),g._7(0,null,null,3,"option",[["disabled",""],["hidden",""]],null,null,null,null,null)),g._5(147456,null,0,m.o,[g.k,g.E,[2,m.r]],{value:[0,"value"]},null),g._5(147456,null,0,m.w,[g.k,g.E,[8,null]],{value:[0,"value"]},null),(e()(),g._27(null,["Select Device Id "])),(e()(),g._27(null,["\n                "])),(e()(),g._1(16777216,null,null,1,null,l)),g._5(802816,null,0,H.i,[g.P,g.M,g.q],{ngForOf:[0,"ngForOf"]},null),(e()(),g._27(null,["\n           "])),(e()(),g._27(null,["\n        \n            "])),(e()(),g._7(0,null,null,14,"select",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],function(e,t,n){var i=!0,o=e.component;return"change"===t&&(i=!1!==g._21(e,21).onChange(n.target.value)&&i),"blur"===t&&(i=!1!==g._21(e,21).onTouched()&&i),"ngModelChange"===t&&(i=!1!==(o.select=n)&&i),"ngModelChange"===t&&(i=!1!==o.onSelect(o.select)&&i),i},null,null)),g._5(16384,null,0,m.r,[g.E,g.k],null,null),g._24(1024,null,m.i,function(e){return[e]},[m.r]),g._5(671744,null,0,m.n,[[8,null],[8,null],[8,null],[2,m.i]],{model:[0,"model"]},{update:"ngModelChange"}),g._24(2048,null,m.j,null,[m.n]),g._5(16384,null,0,m.k,[m.j],null,null),(e()(),g._27(null,["\n                "])),(e()(),g._7(0,null,null,3,"option",[["disabled",""],["hidden",""]],null,null,null,null,null)),g._5(147456,null,0,m.o,[g.k,g.E,[2,m.r]],{value:[0,"value"]},null),g._5(147456,null,0,m.w,[g.k,g.E,[8,null]],{value:[0,"value"]},null),(e()(),g._27(null,["Select Device Status "])),(e()(),g._27(null,["\n                "])),(e()(),g._1(16777216,null,null,1,null,r)),g._5(802816,null,0,H.i,[g.P,g.M,g.q],{ngForOf:[0,"ngForOf"]},null),(e()(),g._27(null,["\n           "])),(e()(),g._27(null,["\n        "])),(e()(),g._27(null,["\n        "])),(e()(),g._1(16777216,null,null,1,null,a)),g._5(16384,null,0,H.j,[g.P,g.M],{ngIf:[0,"ngIf"]},null),(e()(),g._27(null,["\n        "])),(e()(),g._1(16777216,null,null,1,null,c)),g._5(16384,null,0,H.j,[g.P,g.M],{ngIf:[0,"ngIf"]},null),(e()(),g._27(null,["\n        "]))],function(e,t){var n=t.component;e(t,7,0,n.selected),e(t,12,0,n.selectUndefinedOptionValue),e(t,13,0,n.selectUndefinedOptionValue),e(t,17,0,n.someData),e(t,23,0,n.select),e(t,28,0,n.selectUndefinedOptionValue),e(t,29,0,n.selectUndefinedOptionValue),e(t,33,0,n.options),e(t,38,0,!n.blinkingNot),e(t,41,0,!!n.blinkingNot)},function(e,t){e(t,4,0,g._21(t,9).ngClassUntouched,g._21(t,9).ngClassTouched,g._21(t,9).ngClassPristine,g._21(t,9).ngClassDirty,g._21(t,9).ngClassValid,g._21(t,9).ngClassInvalid,g._21(t,9).ngClassPending),e(t,20,0,g._21(t,25).ngClassUntouched,g._21(t,25).ngClassTouched,g._21(t,25).ngClassPristine,g._21(t,25).ngClassDirty,g._21(t,25).ngClassValid,g._21(t,25).ngClassInvalid,g._21(t,25).ngClassPending)})}function p(e){return g._28(0,[(e()(),g._7(0,null,null,1,"ng-component",[],null,null,null,h,V)),g._5(245760,null,0,G,[B.l,$.e,Z.a],null,null)],function(e,t){e(t,1,0)},null)}Object.defineProperty(t,"__esModule",{value:!0});var g=n("/oeL"),d=function(){function e(){}return e}(),_=["agm-map[_ngcontent-%COMP%]{height:580px}select[_ngcontent-%COMP%]{width:180px;height:30px;border:1px solid;font-size:15px}option[_ngcontent-%COMP%]{width:200px;height:35px}"],m=n("bm2B"),f=n("57RD"),v=n("dY6p"),y=n("MVht"),k=n("KdOF"),x=[],M=g._4({encapsulation:2,styles:x,data:{}}),C=(g._2("agm-info-window",y.a,o,{latitude:"latitude",longitude:"longitude",disableAutoPan:"disableAutoPan",zIndex:"zIndex",maxWidth:"maxWidth",isOpen:"isOpen"},{infoWindowClose:"infoWindowClose"},["*"]),n("9U4N")),S=n("BfPg"),w=n("DCX4"),b=n("Ds4W"),O=n("9fk+"),z=n("mECe"),P=n("7PDj"),I=n("wW3n"),L=n("t+Rn"),D=(n("P9AL"),this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t,n){function i(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}()),N=function(e){function t(t,n){var i=e.call(this,t,n)||this;return i._mapsWrapper=t,i._zone=n,i._clustererInstance=new Promise(function(e){i._resolver=e}),i}return D(t,e),t.prototype.init=function(e){var t=this;this._mapsWrapper.getNativeMap().then(function(n){var i=new MarkerClusterer(n,[],e);t._resolver(i)})},t.prototype.addMarker=function(e){var t=this._clustererInstance,n=this._mapsWrapper.createMarker({position:{lat:e.latitude,lng:e.longitude},label:e.label,draggable:e.draggable,icon:e.iconUrl,opacity:e.opacity,visible:e.visible,zIndex:e.zIndex,title:e.title,clickable:e.clickable},!1);Promise.all([t,n]).then(function(e){return e[0].addMarker(e[1])}),this._markers.set(e,n)},t.prototype.deleteMarker=function(e){var t=this,n=this._markers.get(e);return null==n?Promise.resolve():n.then(function(n){t._zone.run(function(){n.setMap(null),t._clustererInstance.then(function(i){i.removeMarker(n),t._markers.delete(e)})})})},t.prototype.clearMarkers=function(){return this._clustererInstance.then(function(e){e.clearMarkers()})},t.prototype.setGridSize=function(e){this._clustererInstance.then(function(t){t.setGridSize(e.gridSize)})},t.prototype.setMaxZoom=function(e){this._clustererInstance.then(function(t){t.setMaxZoom(e.maxZoom)})},t.prototype.setStyles=function(e){this._clustererInstance.then(function(t){t.setStyles(e.styles)})},t.prototype.setZoomOnClick=function(e){this._clustererInstance.then(function(t){void 0!==e.zoomOnClick&&(t.zoomOnClick_=e.zoomOnClick)})},t.prototype.setAverageCenter=function(e){this._clustererInstance.then(function(t){void 0!==e.averageCenter&&(t.averageCenter_=e.averageCenter)})},t.prototype.setImagePath=function(e){this._clustererInstance.then(function(t){void 0!==e.imagePath&&(t.imagePath_=e.imagePath)})},t.prototype.setMinimumClusterSize=function(e){this._clustererInstance.then(function(t){void 0!==e.minimumClusterSize&&(t.minimumClusterSize_=e.minimumClusterSize)})},t.prototype.setImageExtension=function(e){this._clustererInstance.then(function(t){void 0!==e.imageExtension&&(t.imageExtension_=e.imageExtension)})},t}(v.a),E=(n("Da1i"),n("NhXU"),n("Nrw8"),n("ftnM"),n("1s5s"),n("u7vS"),n("wvx+")),A=(function(){function e(){}e.prototype.load=function(){if(!window.google||!window.google.maps)throw new Error("Google Maps API not loaded on page. Make sure window.google.maps is available!");return Promise.resolve()}}(),n("q+Vp")),T=function(){function e(e){this._clusterManager=e}return e.prototype.ngOnDestroy=function(){this._clusterManager.clearMarkers()},e.prototype.ngOnChanges=function(e){e.gridSize&&this._clusterManager.setGridSize(this),e.maxZoom&&this._clusterManager.setMaxZoom(this),e.styles&&this._clusterManager.setStyles(this),e.zoomOnClick&&this._clusterManager.setZoomOnClick(this),e.averageCenter&&this._clusterManager.setAverageCenter(this),e.minimumClusterSize&&this._clusterManager.setMinimumClusterSize(this),e.styles&&this._clusterManager.setStyles(this),e.imagePath&&this._clusterManager.setImagePath(this),e.imageExtension&&this._clusterManager.setImageExtension(this)},e.prototype.ngOnInit=function(){this._clusterManager.init({gridSize:this.gridSize,maxZoom:this.maxZoom,zoomOnClick:this.zoomOnClick,averageCenter:this.averageCenter,minimumClusterSize:this.minimumClusterSize,styles:this.styles,imagePath:this.imagePath,imageExtension:this.imageExtension})},e}(),H=n("qbdv"),B=n("BkNc"),R=n("5ERs"),$=(n("TbKO"),n("CPp0")),G=(n("5v8a"),function(){function e(e,t,n){this.router=e,this.http=t,this.nav=n,this.title="My first AGM project",this.lat=12.98164225,this.lng=77.59287357,this.mapID="TERRAIN",this.userId="12345",this.message="hi",this.markerOpen=!1,this.blinkingNot=!1,this.selectedVal="All",this.markerHidden={},this.thHistory={},this.options=["Red","Yellow","Green","Disconnected","All"],this.someData=[{lat:51.673858,lng:7.615982,label:"Map A",draggable:!0,value:"GREEN",iconUrl:"http://maps.google.com/mapfiles/ms/icons/green.png",message:"",info:!1},{lat:51.373858,lng:7.215982,label:"Map B",draggable:!1,value:"RED",iconUrl:"http://maps.google.com/mapfiles/ms/icons/red.png",message:"",info:!1},{lat:51.723858,lng:7.895982,label:"Map C",draggable:!0,value:"YELLOW",iconUrl:"http://maps.google.com/mapfiles/ms/icons/yellow.png",message:"",info:!1}],this.currentUser=JSON.parse(localStorage.getItem("currentUser")),void 0!=Number(JSON.parse(localStorage.getItem("zoomLevel")))&&0!=Number(JSON.parse(localStorage.getItem("zoomLevel")))||localStorage.setItem("zoomLevel",JSON.stringify(10)),this.zoomLevel=Number(JSON.parse(localStorage.getItem("zoomLevel")))}return e.prototype.ngOnInit=function(){var e=this;this.markerHidden=null!=localStorage.getItem("markerHidden")?JSON.parse(localStorage.getItem("markerHidden")):{},this.thHistory=null!=localStorage.getItem("thHistory")?JSON.parse(localStorage.getItem("thHistory")):{},null!=this.markerHidden&&null!=this.thHistory&&this.callBlinkInterval(),this.userId=JSON.parse(localStorage.getItem("currentUser")),this.getDeviceAttributes(this.userId),this.interval=setInterval(function(){e.getDeviceAttributes(e.userId)},15e3)},e.prototype.ngOnDestroy=function(){clearInterval(this.interval)},e.prototype.clickedMarker=function(e,t){this.router.navigate(["./gauges/:"+e.label]),delete this.markerHidden[e.label],delete this.thHistory[e.label],localStorage.setItem("markerHidden",JSON.stringify(this.markerHidden)),localStorage.setItem("thHistory",JSON.stringify(this.thHistory))},e.prototype.zoomChange=function(e){console.log("hi"),localStorage.setItem("zoomLevel",JSON.stringify(e)),this.zoomLevel=Number(JSON.parse(localStorage.getItem("zoomLevel")))},e.prototype.mouseOver=function(e,t){this.deviceName=t.label,this.message=t.message,e.open()},e.prototype.mouseOut=function(e,t){e.close()},e.prototype.onSelect=function(e){this.selectedVal=e,this.selectedData=this.someData.filter(function(t){return t.value==e||-1!=t.value.indexOf(e)}),"All"==e&&(this.selectedData=this.someData)},e.prototype.onSelected=function(e){for(var t=0;t<this.someData.length;t++)this.markerOpen=!1,this.someData[t].info=!1,this.someData[t].label==e&&(this.lat=this.someData[t].lat,this.lng=this.someData[t].lng,this.someData[t].info=!0)},e.prototype.callBlinkInterval=function(){var e=this;console.log("called"),clearInterval(this.markerInterval),this.markerInterval=setInterval(function(){Object.keys(Object.keys(e.markerHidden).reduce(function(t,n){return 1==e.markerHidden[n].change&&(t[n]=e.markerHidden[n].change),t},{})).map(function(t){e.markerHidden[t].val=!e.markerHidden[t].val})},500)},e.prototype.getDeviceAttributes=function(e){var t,n=this,i=[];this.http.post("/users/deviceList",{user_id:e}).map(function(e){return e.json()}).subscribe(function(e){console.log(e);for(var o=0;o<e.length;o++){"undefined"!=e[o].http_post_interval?(t=Number(e[o].http_post_interval),t>=60?t=t:t<60&&t>=30?t*=3:t>0&&t<30&&(t*=5)):(e[o].http_post_interval=0,t=5),t*=1e3,console.log("dashboard",t),"undefined"!=e[o].ang2_threshold&&"undefined"!=e[o].ang3_threshold||(e[o].ang2_threshold="DISABLE",e[o].ang3_threshold="DISABLE",e[o].ang2_lower_limit="20000",e[o].ang3_lower_limit="0");var l={},r=new Date,s=new Date(e[o].server_log_time),a=r.getTime()-s.getTime();console.log(e),console.log(e[o].server_log_time),console.log("date2",s),console.log("today",r),console.log("diffDays",a),console.log("timedif",t),t>=6e4&&(a-=5e4),console.log("diffDays after subtract",a);var u,c,h,p=e[o].device_id,g=e[o].gas_level,d=e[o].gas_detector;if(console.log(n.thHistory),-1!=Object.keys(n.thHistory).indexOf(e[o].device_id)){var _=n.thHistory[e[o].device_id].split("").map(function(e){return Number(e)}),m=e[o].th.split("").map(function(e){return Number(e)});console.log(_,m),0==_[1]&&1==m[1]||0==_[2]&&1==m[2]||0==_[3]&&1==m[3]||0==_[4]&&1==m[4]||0==_[5]&&1==m[5]?(n.markerHidden[e[o].device_id]={val:!0,change:!0},console.log("changed",n.markerHidden),localStorage.setItem("markerHidden",JSON.stringify(n.markerHidden)),localStorage.setItem("thHistory",JSON.stringify(n.thHistory)),n.callBlinkInterval(),n.blinkingNot=!0):0==_[1]&&1==m[1]&&1==_[2]&&0==m[2]&&1==_[3]&&0==m[3]&&1==_[4]&&0==m[4]&&1==_[5]&&0==m[5]&&(delete n.markerHidden[e[o].device_id],localStorage.setItem("markerHidden",JSON.stringify(n.markerHidden)),localStorage.setItem("thHistory",JSON.stringify(n.thHistory)),n.callBlinkInterval())}n.thHistory[e[o].device_id]=e[o].th,n.tankLevel=Math.round(20*Number(g)),n.GasLeak=Number(d)>4?Math.round(6.25*(Number(d)-4)):0,n.powerSupply=Math.round(8.33*Number(e[o].power_level)),1==e[o].gas_leak||null!=e[o].ang2_threshold&&"ENABLE"==e[o].ang2_threshold&&null!=e[o].ang2_lower_limit&&1e3*Number(e[o].gas_detector)>Number(e[o].ang2_lower_limit)?(u="Red",h="Gas Leak",c=R.a.imagePath+"redmarker.png",a>t&&(u="Disconnected,Red",h="Gas Leak and Disconnected",c=R.a.imagePath+"redmarkerdisconnected.png")):1==e[o].low_gas||null!=e[o].ang3_threshold&&"ENABLE"==e[o].ang3_threshold&&null!=e[o].ang3_lower_limit&&1e3*Number(e[o].gas_level)<Number(e[o].ang3_lower_limit)?(u="Yellow",h="LPG Level",c=R.a.imagePath+"yellow.png",n.powerSupply<75?(u="Red",h="Low Power Level",console.log("low power hit"),c=R.a.imagePath+"redmarker.png",console.log("checking time"),console.log("last time dif",a),console.log("timediff",t),a>t&&(console.log("disconnected"),h="LPG Level,Low Power and Disconnected",u="Disconnected,Red",c=R.a.imagePath+"redmarkerdisconnected.png")):a>t&&(h="LPG Level and Disconnected",u="Disconnected,Yellow",c=R.a.imagePath+"yellowmarkerdisconnected.png",n.powerSupply<75&&(u="Disconnected,Red",h="Low Power Level",c=R.a.imagePath+"redmarkerdisconnected.png"))):(u="Green",h="All Good ",c=R.a.imagePath+"greenmarker.png",n.powerSupply<75?(u="Red",h="Low Power Level",c=R.a.imagePath+"redmarker.png",a>=t&&(u="Disconnected,Red",h="Low Power Level and Disconnected",c=R.a.imagePath+"redmarkerdisconnected.png")):n.powerSupply>=75?(u="Green",c=R.a.imagePath+"greenmarker.png",a>t&&(u="Green,Disconnected",h="Disconnected",c=R.a.imagePath+"greenmarkerdisconnected.png")):a>t&&(u="Green,Disconnected",h="Disconnected",c=R.a.imagePath+"greenmarkerdisconnected.png"));var f=e[o].coordinates,f=f.split(","),v=f[0],y=f[1];l.lat=Number(v),l.lng=Number(y),l.label=p,l.value=u,l.iconUrl=c,l.message="Status: "+h,l.info=!1,i.push(l),0==o&&(n.lat=Number(v),n.lng=Number(y))}JSON.stringify(i),n.someData=JSON.parse(JSON.stringify(i)),n.selectedData=n.someData.filter(function(e){return e.value==n.selectedVal||-1!=e.value.indexOf(n.selectedVal)}),"All"==n.selectedVal&&(n.selectedData=n.someData)},function(e){console.log("Oooops!"+e)})},e}()),Z=n("EDb1"),U=[_],V=g._4({encapsulation:0,styles:U,data:{}}),j=g._2("ng-component",G,p,{},{},[]),J=n("niyx"),W=function(){function e(){}return e}();n.d(t,"DashboardModuleNgFactory",function(){return F});var F=g._3(d,[],function(e){return g._18([g._19(512,g.j,g.Z,[[8,[j]],[3,g.j],g.v]),g._19(4608,m.v,m.v,[]),g._19(4608,H.l,H.k,[g.s]),g._19(4608,J.c,J.c,[]),g._19(4608,J.b,J.b,[]),g._19(4608,I.a,E.b,[E.a,J.c,J.b]),g._19(512,A.a,A.a,[]),g._19(512,W,W,[]),g._19(512,m.t,m.t,[]),g._19(512,m.e,m.e,[]),g._19(512,H.b,H.b,[]),g._19(512,B.o,B.o,[[2,B.t],[2,B.l]]),g._19(512,d,d,[]),g._19(1024,B.j,function(){return[[{path:"",component:G}]]},[]),g._19(256,E.a,{apiKey:"AIzaSyCJ8L3mMI-DQ_3xoh6DR78Os7qtUsVuT1k"},[])])})}});
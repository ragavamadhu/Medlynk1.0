import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { appConfig } from '../app.config';
import { AlertService,NavbarService,UserService } from '../_services/index';
import { User } from '../_models/index';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { HeaderComponent } from '../header/header.component';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit,OnDestroy {
	// initial map points or center point on the map and declare values
	title: string = 'My first AGM project';  
	lat: number = 12.98164225;
	lng: number = 77.59287357;
	levelNum:number;
	mapID: string = 'TERRAIN';
  User_Id:string;
  userId:string = '12345';
  message:string='hi';
  tankPressure:number = 0;
  linePressure:number = 0;
  deviceName:string;
  markerOpen:boolean = false;
  currentUser: User;
  tankLevel:any;
  GasLeak:any;
  select:any;
  powerSupply:Number;
  blinkingNot:boolean=false;
  selectUndefinedOptionValue:any;
  interval:any;
  selectedVal:string='All';
  zoomLevel:any;
  markerInterval:any;
  markerHidden:any={};
  intevalTime =500;
  thHistory:any={};
	ngOnInit(){
    this.markerHidden=localStorage.getItem('markerHidden')!=null?JSON.parse(localStorage.getItem('markerHidden')):{};
    this.thHistory=localStorage.getItem('thHistory')!=null?JSON.parse(localStorage.getItem('thHistory')):{};    
    if(this.markerHidden!=null && this.thHistory!=null)
      this.callBlinkInterval();
    this.userId = JSON.parse(localStorage.getItem('currentUser'));
    this.getDeviceAttributes(this.userId);
    //set interval 
    this.interval = setInterval(() =>{
      this.getDeviceAttributes(this.userId)
    },15000);  
  }  
    //OnDestroy
  ngOnDestroy(){
   clearInterval(this.interval);
  }
  constructor(private router: Router,public http: Http,public nav:NavbarService){
  //get the local user id
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if(Number(JSON.parse(localStorage.getItem('zoomLevel')))==undefined || Number(JSON.parse(localStorage.getItem('zoomLevel')))==0)
  localStorage.setItem('zoomLevel', JSON.stringify(10));
  this.zoomLevel= Number(JSON.parse(localStorage.getItem('zoomLevel')));
  }

	clickedMarker(marker:marker, index:number){
		//this functoin is called when marker is clicked 

    this.router.navigate(['./gauges/:'+marker.label]);
    delete(this.markerHidden[marker.label]);
    delete(this.thHistory[marker.label]);
    localStorage.setItem('markerHidden',JSON.stringify(this.markerHidden));
    localStorage.setItem('thHistory',JSON.stringify(this.thHistory));
	}//clickedMarker

  zoomChange(m){
    localStorage.setItem('zoomLevel', JSON.stringify(m));
    this.zoomLevel= Number(JSON.parse(localStorage.getItem('zoomLevel')));
  }

	mouseOver(infoWindow, gm) {
		//on mouse over event , it opens up the info-window
    this.deviceName = gm.label;
    this.message = gm.message;
		infoWindow.open();
	}//mouseOver


	mouseOut(infoWindow, gm) {
		//on mouse out event , close info-window
		infoWindow.close();
	}//mouseOut

	options =['Red', 'Yellow', 'Green','Disconnected','All']
	selected;
	selectedData;
   //onSelect which map to be shown on map by default, its All
  onSelect(val){
    this.selectedVal = val;
    this.selectedData = this.someData.filter(x => x.value == val || x.value.indexOf(val)!=-1)
    if(val=='All')
    {
     this.selectedData = this.someData;
    }
  }

  //on select of device , center the tip point and show the info window 
  onSelected(val){
    for (var i = 0; i < this.someData.length; i++){
        this.markerOpen = false;
        this.someData[i].info = false;
        // look for the entry with a matching `code` value
    if (this.someData[i].label == val){
        this.lat = this.someData[i].lat;
        this.lng = this.someData[i].lng;/*
        this.deviceName = this.someData[i].label;
        this.message = this.someData[i].message;
        this.markerOpen = true;
        console.log(this.someData[i].label);*/
        this.someData[i].info = true;
    	  }
      }
  }
  callBlinkInterval(){
    console.log("called");
    clearInterval(this.markerInterval);
            this.markerInterval=setInterval(()=>{
              var keys=Object.keys(Object.keys(this.markerHidden)
              .reduce((o, key) => {
                this.markerHidden[key].change == true && (o[key] = this.markerHidden[key].change);
                return o;
              }, {}));
              keys.map((val)=>{this.markerHidden[val].val=!this.markerHidden[val].val});
            },this.intevalTime);
    }

    getDeviceAttributes(id:string){
    var link = '/users/deviceList';
    var jsonObject =[];
    var timediff;
    //var data = JSON.stringify();
    this.http.post(link, {user_id:id})
    .map(res => res.json())
    .subscribe(data => {
    // this.data.response = data;
    console.log(data);
    for (var i = 0; i < data.length; i++){
        if(data[i].http_post_interval!='undefined'){
          timediff=Number(data[i].http_post_interval);
            if(timediff >= 60 ){
              timediff=timediff;
            }
            else if(timediff<60 && timediff>=30){
              timediff=3*timediff;
            }
            else if(timediff>0 && timediff<30){
              timediff=5*timediff;
            }
        }
        else{
          data[i].http_post_interval=0;
          timediff=5;
        }

      timediff*=1000;

      console.log("dashboard",timediff);

      if(data[i].ang2_threshold=='undefined' || data[i].ang3_threshold=='undefined'){
        data[i].ang2_threshold="DISABLE";
        data[i].ang3_threshold="DISABLE";
        data[i].ang2_lower_limit="20000";
        data[i].ang3_lower_limit="0";
      }
      var item = {};

      var today = new Date();
      //converting the log date in date formate
      var date2 = new Date(data[i].server_log_time);
      //get the difference between the date in days
      var diffDays = today.getTime() - date2.getTime();

console.log(data);        
console.log(data[i].server_log_time);
console.log("date2",date2);
console.log("today",today);
console.log("diffDays",diffDays);
console.log("timedif",timediff);

      if(timediff >= 60000 ){
          diffDays=diffDays-50000;}
console.log("diffDays after subtract",diffDays);  
        // var diffDays = Math.ceil(diff / (60000)); 
        //comment the console.log after done with testing
        //deivce id
        var device_id = data[i].device_id;
        var value ;
        var iconUrl;
        var message;
        var tankLevelA = data[i].gas_level;
        var gasLeakA = data[i].gas_detector;
        var tankPressureA =data[i].tank_pressure;
        var linePressureA = data[i].line_pressure;
        var allOkStatus = false;

console.log(this.thHistory); 

        this.tankLevel = Math.round(Number(tankLevelA)*20);
        if(Number(gasLeakA)>4){
        this.GasLeak = Math.round((Number(gasLeakA)-4)*6.25);}
        else
        this.GasLeak = 0;
        this.powerSupply=Math.round(Number(data[i].power_level)*8.33);  
        data[i].power_level=this.powerSupply;

        this.tankPressure= Math.round((Number(tankPressureA)*4)* 10)/10 ;
        if(this.tankPressure>20)
          this.tankPressure=20;
        data[i].tank_pressure= this.tankPressure;

        this.linePressure = Math.round((Number(linePressureA)*0.4)* 10)/10 ;
        if(this.linePressure>20)
          this.linePressure=20;
        data[i].line_pressure= this.linePressure;

        if(data[i].gas_leak == 1 || (data[i].ang2_threshold!=null && data[i].ang2_threshold=="ENABLE" && data[i].ang2_lower_limit!=null && Number(data[i].gas_detector)*1000>Number(data[i].ang2_lower_limit))){
          data[i].gas_leak = 1 ;
          value="Red";
          message = "Gas Leak";
          iconUrl=appConfig.imagePath+'redmarker.png';
              if(diffDays>timediff){
              value="Disconnected,Red";
              message = "Gas Leak and Disconnected";
              iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';  
            }
        } 
        else if(data[i].low_gas == 1 ||(this.tankLevel<=15 || this.tankLevel>=85)||(data[i].ang3_threshold!=null && data[i].ang3_threshold=="ENABLE" && data[i].ang3_lower_limit!=null && Number(data[i].gas_level)*1000<Number(data[i].ang3_lower_limit)  )){
            data[i].low_gas =1;
            value="Yellow";
            message = "LPG Level";
            iconUrl=appConfig.imagePath+'yellow.png';
            if(this.powerSupply<75){
            value="Red";
            message = "Low Power Level";
            iconUrl=appConfig.imagePath+'redmarker.png';
            if(diffDays>timediff){
              message = "LPG Level,Low Power and Disconnected";
              value="Disconnected,Red";
              iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';                
            }
          }else{
              if(diffDays>timediff){
              message = "LPG Level and Disconnected";
              value="Disconnected,Yellow";
              iconUrl=appConfig.imagePath+'yellowmarkerdisconnected.png';  
                if(this.powerSupply<75){
                  value="Disconnected,Red";
                  message = "Low Power Level";
                  iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';
                }
              }
          }
        }
        else if(this.tankPressure<=3 || this.tankPressure>=7){
          value="Yellow";
          message = "Tank Pressure";
          iconUrl=appConfig.imagePath+'yellow.png';
          if(this.powerSupply<75){
          value="Red";
          message = "Low Power Level";
          iconUrl=appConfig.imagePath+'redmarker.png';
          if(diffDays>timediff){
            message = "Tank Pressure,Low Power and Disconnected";
            value="Disconnected,Red";
            iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';                
          }
        }else{
            if(diffDays>timediff){
            message = "Tank Pressure and Disconnected";
            value="Disconnected,Yellow";
            iconUrl=appConfig.imagePath+'yellowmarkerdisconnected.png';  
              if(this.powerSupply<75){
                value="Disconnected,Red";
                message = "Low Power Level";
                iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';
              }
            }
        }
        } 
        else if(this.linePressure<=0.7 || this.linePressure>= 1.2 ){
          value="Yellow";
          message = "Line Pressure";
          iconUrl=appConfig.imagePath+'yellow.png';
          if(this.powerSupply<75){
          value="Red";
          message = "Low Power Level";
          iconUrl=appConfig.imagePath+'redmarker.png';
          if(diffDays>timediff){
            message = "Line Pressure,Low Power and Disconnected";
            value="Disconnected,Red";
            iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';                
          }
        }else{
            if(diffDays>timediff){
            message = "Line Pressure and Disconnected";
            value="Disconnected,Yellow";
            iconUrl=appConfig.imagePath+'yellowmarkerdisconnected.png';  
              if(this.powerSupply<75){
                value="Disconnected,Red";
                message = "Low Power Level";
                iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';
              }
            }
        }
        }
        else{
            value="Green";  
            message = "All Good ";
            iconUrl=appConfig.imagePath+'greenmarker.png';
            if(this.powerSupply<75){
                value="Red";
                message = "Low Power Level";
                iconUrl=appConfig.imagePath+'redmarker.png';
                if(diffDays>=timediff){
                    value="Disconnected,Red";
                    message = "Low Power Level and Disconnected";
                    iconUrl=appConfig.imagePath+'redmarkerdisconnected.png';  
                }
            }
            else if(this.powerSupply>=75){
              allOkStatus = true;
              value="Green";
              iconUrl=appConfig.imagePath+'greenmarker.png';
              if(diffDays>timediff){
                  value="Green,Disconnected";
                  message="Disconnected";
                  iconUrl=appConfig.imagePath+'greenmarkerdisconnected.png';  
              }
            }
            else{
              if(diffDays>timediff){
                allOkStatus = true;
                  value="Green,Disconnected";
                  message="Disconnected";
                  iconUrl=appConfig.imagePath+'greenmarkerdisconnected.png';  
              }
              else
              allOkStatus = true;
            } 
        }
        //addition code 
        if(Object.keys(this.thHistory).indexOf(data[i].device_id)!=-1){
          var oldthsplit=this.thHistory[data[i].device_id];
          var newthsplit=data[i];  
          if((oldthsplit.gas_leak==0 && newthsplit.gas_leak==1) ||(oldthsplit.power_level >=75 && newthsplit.power_level<=75)|| (oldthsplit.low_gas==0 && newthsplit.low_gas==1) ||(oldthsplit.tank_pressure!=newthsplit.tank_pressure &&(newthsplit.tank_pressure<=3 || newthsplit.tank_pressure>=7))||(oldthsplit.line_pressure!=newthsplit.line_pressure &&(newthsplit.line_pressure<=0.7 || newthsplit.line_pressure>=1.2)))
          {
            if(!allOkStatus){
              delete(this.markerHidden[data[i].device_id]);
            this.markerHidden[data[i].device_id]={val:true,change:true};            
            localStorage.setItem('markerHidden',JSON.stringify(this.markerHidden));
            localStorage.setItem('thHistory',JSON.stringify(this.thHistory));
            this.callBlinkInterval();
            this.blinkingNot = true;
            this.intevalTime = 600;
            }
          }
          if(newthsplit.gas_leak==0 && newthsplit.low_gas==0 && (newthsplit.tank_pressure>=3 && newthsplit.tank_pressure<=7)&&(newthsplit.line_pressure>=0.7 && newthsplit.line_pressure<=1.2 ) && newthsplit.power_level<=75)
          {
            if(allOkStatus){
            delete(this.markerHidden[data[i].device_id]);
            localStorage.setItem('markerHidden',JSON.stringify(this.markerHidden));
            localStorage.setItem('thHistory',JSON.stringify(this.thHistory));
            this.callBlinkInterval();
            }
          }
          if(allOkStatus){
            delete(this.markerHidden[data[i].device_id]);
          }
     }
      this.thHistory[data[i].device_id]=data[i];
        //if the diff of current date time and log time is more than 2 days set status as 
        var coordinates = data[i].coordinates;
        var coordinates = coordinates.split(",");
        var lat = coordinates[0];
        var lang = coordinates[1];

        item["lat"] = Number(lat);
        item["lng"] = Number(lang);
        item["label"] = device_id;
        item["value"] = value;
        item["iconUrl"] = iconUrl;
        item["message"] = "Status: "+message;
        item["info"]=false;
        jsonObject.push(item);

        if(i==0){
         this.lat = Number(lat);
         this.lng = Number(lang);      
        }
      }

      var json = JSON.stringify(jsonObject);
      //set json for map loc
      this.someData =JSON.parse(JSON.stringify(jsonObject))
      //this.selectedData = this.someData;
      this.selectedData = this.someData.filter(x => x.value == this.selectedVal || x.value.indexOf(this.selectedVal)!=-1);
      if(this.selectedVal=='All'){
       this.selectedData = this.someData;
      }
    }, error => {
     console.log("Oooops!"+error);
    });
  }
   someData = 
      [{
		  lat: 51.673858,
		  lng: 7.615982,
		  label: 'Map A',
		  draggable: true,
		  value:'GREEN',
		  iconUrl:"http://maps.google.com/mapfiles/ms/icons/green.png",
      message:"",
      info: false
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'Map B',
		  draggable: false,
		  value:'RED',
		  iconUrl:"http://maps.google.com/mapfiles/ms/icons/red.png",
      message:"",
      info: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'Map C',
		  draggable: true,
		  value:'YELLOW',
		  iconUrl:"http://maps.google.com/mapfiles/ms/icons/yellow.png",
      message:"",
      info: false
	  }] 
}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
	iconUrl?: string;
  message?:string;
  info: boolean;
}
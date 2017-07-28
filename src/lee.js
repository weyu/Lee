/*! 
Version：Lee v1.0
Author: Charles
Github: https://github.com/weyu/Lee.git
License: Apache License 2.0
*/


//校验规则
var Leyz = {
	mobile:function(value){
		var regExp = /^(13[0-9]|15[012356789]|18[0-9]|17[678]|14[57])[0-9]{8}$/;
		return {
			status: regExp.test(value),
			msg:"请输入正确的手机号码"
		}
	},
	phone:function(value){
		var regExp = /^0[0-9]{2,3}-[0-9]{7,8}$/;
		return {
			status: regExp.test(value),
			msg:"请输入正确的座机号码"
		}
	},
	email:function(value){
		var regExp = /^\w+@\w+\.\w+$/;
		return {
			status: regExp.test(value),
			msg:"请输入正确的邮箱"
		}
	},
	qq:function(value){
		var regExp = /^[1-9][0-9]{4,10}$/;
		return {
			status: regExp.test(value),
			msg:"请输入正确的QQ号码"
		}
	},
	name:function(value){
		var regExp = /^[\u4E00-\u9FA5]{2,}$/;
		return {
			status: regExp.test(value),
			msg:"请输入正确的姓名"
		}
	},
	number:function(value){
		var regExp = /^\d{1,}$/;
		return {
			status: regExp.test(value),
			msg:"请输入数字"
		}
	},
	password:function(value){
		var regExp = /^[a-zA-Z]\w{5,17}$/;
		return {
			status: regExp.test(value),
			msg:"请输入正确的密码"
		}
	},
	equalTo:function(value1,value2){
		var regExp = (value1 == value2);
		return {
			status: regExp,
			msg:"两次密码输入不一致"
		}
	},
	required:function(value){
		var regExp = ($.trim(value) != '');
		return {
			status: regExp,
			msg:"有必填项未填"
		}
	},
	compare:function(value1,value2){
		var regExp = (Number(value1) < Number(value2));
		return {
			status: regExp,
			msg:"区间值输入不正确"
		}
	},
};


//校验插件
( function( $ ) {
	$.fn.extend({
		Lee: function( options ) {

			//默认参数
			var defaults = {
				text : "表单校验"
			};

			var options =  $.extend(defaults, options),
				plugin = this,
				findElm = function(name){
					return plugin.find('input[name='+ name +']');
				},
				leeFun = function(){
					//错误消息列表
					var yzMsg = [];

					//遍历name
					$.each(options.name,function(index,obj){
						var $inElm = findElm(index), //输入框
							inVal = $inElm.val(), //输入框值
							reSult = false; //错误开关

						//非必填跳过
						if( ( obj.required===false || (typeof(obj.required)=='function' && !obj.required()) ) && !Leyz['required'](inVal).status ){
							return true;
						}

						//遍历条件
						$.each(obj, function(i,o){
							if(o===false) return true;

							var result={}; //校验结果数组

							switch(i){
								case "equalTo":case "compare":
									var eqElm = findElm(o).val();
									result = Leyz[i](eqElm,inVal);
									break;
								default:
									result = Leyz[i](inVal);
							}

							//如果校验不通过
							if(!result.status){
								reSult=true;
								var errMsg="", //错误消息
									msgObj = options.message ? options.message[index] : ''; //自定义消息
								errMsg = msgObj && msgObj[i] ? msgObj[i] : result.msg;
								yzMsg.push([$inElm,errMsg]);
							};

						});

						//如果校验不通过
						if(reSult){
							//添加错误样式
							$inElm.parent().addClass('has-error');
						} else{
							//去除错误样式
							$inElm.parent().removeClass('has-error');
						}

					});

					//必填项元素检测
					$.each([
							'required'
						], function(yz_index,yz_obj){
						plugin.find('input['+ yz_obj +']').each(function(){
							result = Leyz[yz_obj]($(this).val());
							if(!result.status){
								$(this).parent().addClass('has-error');
								yzMsg.push([$(this),result.msg]);
							} else{
								$(this).parent().removeClass('has-error');
							}
						});
					});

					//如果存在错误，则阻止提交事件
					if(yzMsg.length > 0){
						var $erElm = yzMsg[0][0],
							labInfo = $erElm.parents('.form-group').find('label');
							labInfo = labInfo.length > 0 ? labInfo.text() : '';
							if(labInfo!='') labInfo = labInfo.charAt(labInfo.length -1) == '：' ? labInfo : labInfo+'：';

						//提示错误消息
						layer.msg(labInfo + yzMsg[0][1]);
						$('html,body').animate({scrollTop:$erElm.offset().top-34});

						//输入框抖动
						if(options.shake){
							var douArr = [];
							for(var i=10; i>0; i-=2){
								douArr.push(i,-i);
							}
							$erElm.css({'position':'relative','left':'0'});
							var douNum = 0,
								timer = setInterval(function(){
									$erElm.css({'left':( parseInt($erElm.css('left')) + douArr[douNum] ) + 'px'});
									douNum++;
									if ( douNum === douArr.length ) {
							            clearInterval( timer );
							        }
							},40);
						}

						return false;
					}

					//如果存在自定义表单事件
					if(options.submit){
						options.submit(plugin);
						return false;
					}
				};

			//初始化时执行submit方法
			if(options.submit && options.submitLoad && plugin.length > 0){
				options.submit(plugin);
			}

			//提交事件
			plugin.submit(function(){
				return leeFun();
			});

			//绑定校验事件到元素
			if(options.events){
				$(document).on('click',options.events,leeFun);
			}
			
		}
	});
}( jQuery ));
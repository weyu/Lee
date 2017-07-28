### Lee ###
基于jQuery的表单校验插件

### 使用方法 ###
```javascript
//#lee-form为您的form元素id选择器
$('#lee-form').Lee({
    //name属性：为一个包含所有表单元素的校验规则集合
    name: {
        //需校验的input的name名
        email: { 
            //校验规则为email，true为开启校验
            email: true 
        }
    },
    //错误消息属性：自定义错误消息
    message: {
        //需要自定义错误消息的input的name名
        email: {
            //校验规则对应的错误消息
            email: "请输入合法的邮箱"
        }
    },
    //校验通过的回调 form 参数为您的form元素对象
    submit: function(form){
        //您的代码
        //form.submit(); //提交表单
    },
    //初始化时不校验直接执行submit参数里面传入的方法 false代表此项不生效
    submitLoad: false,
    //给按钮绑定校验事件
    events:'#btn1, #btn2', 
    //错误抖动效果
    shake:true 
});
```
### 本插件自带的规则有： ###
<table>
    <thead>
        </tr>
            <th>规则</th>
            <th>错误消息</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
      <tr>
          <td>mobile</td>
          <td>请输入正确的手机号码</td>
          <td>手机号码</td>
      </tr>
      <tr>
          <td>phone</td>
          <td>请输入正确的座机号码</td>
          <td>座机号码</td>
      </tr>
      <tr>
          <td>email</td>
          <td>请输入正确的邮箱</td>
          <td>邮箱</td>
      </tr>
      <tr>
          <td>qq</td>
          <td>请输入正确的QQ号码</td>
          <td>QQ号</td>
      </tr>
      <tr>
          <td>name</td>
          <td>请输入正确的姓名</td>
          <td>中文姓名</td>
      </tr>
      <tr>
          <td>number</td>
          <td>请输入数字</td>
          <td>数字</td>
      </tr>
      <tr>
          <td>password</td>
          <td>请输入正确的密码</td>
          <td>密码</td>
      </tr>
      <tr>
          <td>equalTo</td>
          <td>两次密码输入不一致</td>
          <td>确认密码</td>
      </tr>
      <tr>
          <td>required</td>
          <td>有必填项未填</td>
          <td>必填项</td>
      </tr>
      <tr>
          <td>compare</td>
          <td>区间值输入不正确</td>
          <td>区间值</td>
      </tr>
</tbody>
</table>

具体可以在本项目根目录的demo.html文件查看效果

### 更新记录： ###
v1.0 2017年7月28日
说明：第一个版本

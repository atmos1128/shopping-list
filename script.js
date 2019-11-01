var vm = new Vue({
  el: '#app',
  data: {
    visibility: 'all',
    newtodo:'',
    todoName: '', //與input名稱綁定
    todoNum: '', //與input數量綁定
    todoPrice: '', //與input價錢綁定
    cacheTodo: {},
    cacheName: '',
    cacheNum : '',
    cachePrice: '',
    lists: [
      { 
        id: 1,
        name: '巧呼呼蘇打水',
        num: 7,
        price: 30,
        completed : true
      },
      {
        id: 2,
        name: '心驚膽跳羊肉飯',
        num: 2,
        price: 65,
        completed: false
      },
      {
        id: 3,
        name: '郭師傅武功麵包',
        num: 1,
        price: 32,
        completed: false
      },
      {
        id: 4,
        name: '不太會過期的新鮮牛奶',
        num: 60,
        price: 75,
        completed: false
      },
      {
        id: 5,
        name: '金殺 巧粒粒',
        num: 10,
        price: 120,
        completed: false
      }
    ],
    istype: 'num',
    isReverse : true,
  },
  methods:{
    //增加清單項目
    add: function(){
     var id = Math.floor(Date.now())
     var name = this.todoName.trim()
     var num = this.todoNum.trim()
     var price = this.todoPrice.trim()
     
     if(!name && !num && !price){
       return 
     }
     this.lists.push({
       id: id,
       name: name,
       num: num,
       price: price,
       completed: false,
     })
      this.todoName = '';
      this.todoNum = ''
      this.todoPrice = ''
      $('.announcement').hide()
    },
    ///刪除清單
    remove: function(todo){
      var index = this.lists.findIndex(item=>{
        return todo.id == item.id
      })
      this.lists.splice(index,1)
    },
    //傳入點擊的字
    edit: function(item){     
      this.cacheTodo = item;
      this.cacheName = item.name;
      this.cacheNum = item.num 
      this.cachePrice = item.price 
      console.log(this.cacheTodo)
    },
    //取消更改
    cancelEdit: function(){
      this.cacheTodo = {};
    },
    //確認更改
    canceEnter: function(item){
      item.name = this.cacheName
      item.num = this.cacheNum
      item.price = this.cachePrice
      this.cacheName = ''
      this.cacheNum = ''
      this.cachePrice = ''
      this.cacheTodo ={}
    },
    //刪除所有清單
    deleteAll : function(){
      this.lists = []
      $('.announcement').show()
      $('.checkDelet').hide();
      },
  },
  computed: {
    //排序 
    sortList: function(){
      var vm = this;
      return this.lists.sort(function(a,b){
          return vm.isReverse === true ? a[vm.istype] - b[vm.istype] : b[vm.istype]- a[vm.istype]     
      });
    },
    //分類 
    filterList: function(){
     return this.sortList.filter(todo => {
        if (this.visibility === 'all') return this.sortList;
        if (this.visibility === 'active') return !todo.completed;
        if (this.visibility === 'completed') return todo.completed;
      });
    },
    //活動中總數
    activenum : function(){
      return this.lists.filter(todo=>!todo.completed).length
    },
    //完成總數
    completednum : function(){
      return this.lists.filter(todo=> todo.completed).length
    },
    //總數量
    numadd : function(){
      let total = 0
      this.lists.forEach(item =>{
         total = total + parseInt(item.num)
      })   
      return total     
    },
    //總價
    priceadd : function(){
      let total = 0
      this.lists.forEach(item =>{
         total = total + parseInt(item.price)
      })   
      return total  
    }
  }
});
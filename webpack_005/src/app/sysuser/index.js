require(['./service', 'vue'], function() {
  var sysuserVm = new Vue({
    el: '#sysuser',
    data: {
      newTodo: '',
      todos: [{
        text: 'Add some todos'
      }]
    },
    methods: {
      addTodo: function() {

        var text = this.newTodo.trim()
        if (text) {
          this.todos.push({
            text: text
          })
          this.newTodo = ''
        }
        service.m1(text);
      },
      removeTodo: function(index) {
        this.todos.splice(index, 1)
      }
    }
  });
});
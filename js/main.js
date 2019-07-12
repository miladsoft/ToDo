
new Vue({
    el: '#appTasks',
    data: {
        task:"",
        tasks: []
    },
    //Actions add & remove
    methods: {
        addTask:function(){
            var task = this.task.trim();
            if(task) {
                this.tasks.push({
                    text:task,
                    checked:false
                });
            }
            this.task ="";

        },

        removeTask:function(task){
            var index = this.tasks.indexOf(task);
            this.tasks.splice(index,1);
        }
    }

});
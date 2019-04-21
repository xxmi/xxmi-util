<template>
    <section class="demo-form">
        <div id="snippetJavascript">
            VUE Main.js
            <pre>
                <code class="hljs javascript">
                    // element-ui 表单验证使用 xxmi-uitl/validator.js
                    import Vue from 'vue';
                    import Validate from 'xxmi-util/lib/validator';
                    Vue.use(Validate);
                </code>
            </pre>
        </div>
        <div id="snippetHtml">
            VUE HTML
            <pre>
                 <code class="hljs html">
                   &lt;el-form-item label="账号"
                                prop="account"
                                :error="validateError.account.message"
                                :rules="[{required:true,message:'账号必填'},
                                        {validator:validate.account}]"&gt;
                          &lt;el-input v-model="form.account"/&gt;
                    &lt;/el-form-item&gt;
                </code>
            </pre>
        </div>
        <el-form ref="form"
                 :model="form"
                 label-width="200px">
            <el-form-item label="账号"
                          prop="account"
                          :error="validateError.account.message"
                          :rules="[{required:true,message:'账号必填'},
                          {validator:validate.account}]">
                <el-input v-model="form.account"/>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit">提交</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
  export default {
    name: 'demo-form',
    data () {
      return {
        form: {
          account: '' // 账号
        },
        validateError: { // 验证错误
          account: {
            message: '',
            '60008': '账号名已经存在',
            '60009': '账号不符合'
          }
        }
      };
    },
    methods: {
      submit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.clearError();
            window.setTimeout(() => {
              if (Math.floor(Math.random() * 999) % 2 === 0) {
                this.showError('60008');
              } else {
                this.showError([{code: '60009'}]);
              }
            }, 1000);
          }
          return false;
        });
      },
      reset () {
        this.$refs.form.resetFields();
      }
    },
    created () {
      console.log(this.validate);
    },
    mounted () {
      this.$nextTick(() => {
        this.hljs('snippetJavascript', 'snippetHtml');
      });
    }
  };
</script>

<style scoped>

</style>
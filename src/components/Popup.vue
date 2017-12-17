<template>
    <section class="popup">
        <div id="mask" ref="mask">
        </div>
        <div class="popup-wrapper" ref="popupWrapper">
            <div class="dialog">
                <h4><b>提示</b></h4>
                <p>确定要从书架中删除?</p>
                <div class="operate-button">
                    <span class="hiden-popup" @click="cancel">
                        取消
                    </span>
                    <span class="sure" @click="determine">
                        确定
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'dialog',
    data() {
        return {
            $docEle: null,
            $body: null,
            $mask: null,
            $popupWrapper: null
        };
    },
    props: {
        options: Object
    },
    mounted() {
        this.$docEle = document.documentElement;
        this.$body = document.body;
        this.$mask = this.$refs.mask;
        this.$popupWrapper = this.$refs.popupWrapper;
        this.init();
        window.addEventListener('scroll', this.debounce(this.init, 0, 0));
    },
    methods: {
        init: function() {
            let $clientHeight = this.$docEle.scrollTop + this.$body.scrollTop + this.$body.clientHeight;
            let $clientWidth = this.$body.clientWidth;
            this.$mask.style.height = $clientHeight + 'px';
            this.$mask.style.width = $clientWidth + 'px';
            this.$popupWrapper.style.top = this.$body.clientHeight * 0.5 + 'px';
        },
        debounce: function(func, wait, mustRun) {
            let timeout = null;
            let startTime = new Date();
            return function() {
                let context = this;
                let args = arguments;
                let curTime = new Date();
                clearTimeout(timeout);
                if (curTime - startTime >= mustRun) {
                    func.apply(context, args);
                    startTime = curTime;
                } else {
                    timeout = setTimeout(func, wait);
                }
            };
        },
        determine: function() {
            this.$emit(this.options.determine);
        },
        cancel: function() {
            this.$emit(this.options.cancel);
        }
    }
};
</script>

<style lang="scss">
#mask {
    position: absolute;
    top: 0;
    z-index: 10003;
    opacity: 0.5;
    filter: opacity(50);
    background-color: #000;
}
.popup-wrapper {
    position: absolute;
    left: 50%;
    width: 70%;
    height: 20%;
    border-radius: 5px;
    background-color: #fff;
    z-index: 20003;
    transform: translate(-50%, -50%);
    .dialog {
        position: relative;
        margin: 10px auto;
        width: 86%;
        height: 90%;
    }
    h4 {
        font-size: 18px;
    }
    p {
        font-family: '微软雅黑';
        margin-top: 20px;
    }
    .operate-button {
        position: absolute;
        display: flex;
        justify-content: flex-end;
        right: 0;
        bottom: 20px;
        width: 100%;
        & > span:nth-child(2) {
            color: red;
        }
        span {
            margin-right: 5%;
            font-size: 14px;
        }
    }
}
</style>


<template>
    <section class="popup">
        <div id="mask" ref="mask">
        </div>
        <div class="popup-wrapper" ref="popupWrapper">
            <div class="popup-dialog">
                <h4><b>提示</b></h4>
                <p>{{options.title}}</p>
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
import util from '../../util/util';

export default {
    name: 'popup',
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
        window.addEventListener('scroll', util.debounce(this.init, 0, 0));
    },
    methods: {
        init() {
            let $clientHeight = this.$docEle.scrollTop + this.$body.scrollTop + this.$body.clientHeight;
            let $clientWidth = this.$body.clientWidth;
            this.$mask.style.height = $clientHeight + 'px';
            this.$mask.style.width = $clientWidth + 'px';
            this.$popupWrapper.style.top = this.$body.clientHeight * 0.5 + 'px';
        },
        determine() {
            this.$emit(this.options.determine);
        },
        cancel() {
            this.$emit(this.options.cancel);
        }
    }
};
</script>

<style lang="scss">
    @import './Popup.scss';
</style>


import { TOC } from '@ember/component/template-only';

const ModalFooter: TOC<{ Blocks: { default: [] } }> = <template>
  <div class='modal-footer'>
    {{yield}}
  </div>
</template>;

export default ModalFooter;

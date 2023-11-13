import { TOC } from '@ember/component/template-only';

const ModalContent: TOC<{ Blocks: { default: [] } }> = <template>
  <div class='modal-content'>
    {{yield}}
  </div>
</template>;

export default ModalContent;

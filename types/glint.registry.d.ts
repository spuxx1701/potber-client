import '@glint/environment-ember-loose';
import '@glint/environment-ember-loose/native-integration';
import 'ember-page-title/glint';
import AccordionComponent from 'potber-client/components/common/control/accordion';
import PrivateMessageListComponent from 'potber-client/components/features/private-messages/list';
import ModalComponent from 'potber-client/components/modal';
import NavComponent from 'potber-client/components/nav';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Common::Control::Accordion': typeof AccordionComponent;
    'Features::PrivateMessages::List': typeof PrivateMessageListComponent;
    Modal: typeof ModalComponent;
    Nav: typeof NavComponent;
  }
}

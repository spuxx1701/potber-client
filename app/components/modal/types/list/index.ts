import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ModalService from 'potber-client/services/modal';

export interface ListModalOptions {
  onSubmit: (type: ListType, entries: string[]) => void;
}

export enum ListType {
  Empty = 'empty',
  Numerical = 'numerical',
  Alphabetical = 'alphabetical',
}

interface Signature {
  Args: {
    options: ListModalOptions;
  };
}

interface ListTypeOption {
  label: string;
  data: ListType;
}

export default class ListModelComponent extends Component<Signature> {
  @service declare modal: ModalService;

  @tracked hasRemoveableEntries = false;
  @tracked entries = [''];

  selectedListType = ListType.Empty;
  listTypes: ListTypeOption[] = [
    {
      label: 'Leer',
      data: ListType.Empty,
    },
    {
      label: 'Nummeriert',
      data: ListType.Numerical,
    },
    {
      label: 'Alphabetisch',
      data: ListType.Alphabetical,
    },
  ];

  @action handleTextChange(index: number, value: string) {
    this.entries[index] = value;
  }

  @action handleAdd(index: number) {
    const start = this.entries.slice(0, index + 1);
    const end = this.entries.slice(index + 1);
    this.entries = [...start, '', ...end];
    this.hasRemoveableEntries = true;
  }

  @action handleRemove(index: number) {
    const start = this.entries.slice(0, index);
    const end = this.entries.slice(index + 1);
    this.entries = [...start, ...end];

    if (this.entries.length === 1) {
      this.hasRemoveableEntries = false;
    }
  }

  @action handleTypeSelect(value: ListTypeOption) {
    this.selectedListType = value.data;
  }

  @action handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.selectedListType, this.entries);
    this.args.options.onSubmit(this.selectedListType, this.entries);
  }

  @action handleCancel() {
    this.modal.close();
  }
}

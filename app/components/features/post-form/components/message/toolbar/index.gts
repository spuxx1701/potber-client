import Component from '@glimmer/component';
import styles from '../styles.module.css';
import classNames from 'potber-client/helpers/class-names';
import PostFormMessageSimpleTag from './controls/simple-tag';
import { Posts, Threads } from 'potber-client/services/api/types';
import { t } from 'ember-intl';
import PostFormMessageEmojiSelect from './controls/emoji-select';
import PostFormMessageMemeSelect from './controls/meme-select';
import PostFormMessageLink from './controls/link';
import PostFormMessageList from './controls/list';
import PostFormMessageImage from './controls/image';
import PostFormMessageSimpleInput from './controls/simple-input';

interface Signature {
  post: Posts.Write | Threads.OpeningPost;
  textarea: HTMLTextAreaElement;
}

export default class PostFormMessageToolbar extends Component<Signature> {
  styles = styles;

  <template>
    <div class={{classNames this 'toolbar-container'}}>
      <div class={{classNames this 'toolbar'}} role='toolbar'>
        <PostFormMessageEmojiSelect @post={{@post}} @textarea={{@textarea}} />
        <PostFormMessageMemeSelect @post={{@post}} @textarea={{@textarea}} />
        <PostFormMessageSimpleTag
          @text={{t 'feature.post-form.message.toolbar.bold'}}
          @icon='bold'
          @opening='[b]'
          @closing='[/b]'
          @textarea={{@textarea}}
          @post={{@post}}
        />
        <PostFormMessageSimpleTag
          @text={{t 'feature.post-form.message.toolbar.italic'}}
          @icon='italic'
          @opening='[i]'
          @closing='[/i]'
          @textarea={{@textarea}}
          @post={{@post}}
        />
        <PostFormMessageSimpleTag
          @text={{t 'feature.post-form.message.toolbar.underline'}}
          @icon='underline'
          @opening='[u]'
          @closing='[/u]'
          @textarea={{@textarea}}
          @post={{@post}}
        />
        <PostFormMessageSimpleTag
          @text={{t 'feature.post-form.message.toolbar.strikethrough'}}
          @icon='strikethrough'
          @opening='[s]'
          @closing='[/s]'
          @textarea={{@textarea}}
          @post={{@post}}
        />
        <PostFormMessageSimpleTag
          @text={{t 'feature.post-form.message.toolbar.mono'}}
          @icon='m'
          @opening='[m]'
          @closing='[/m]'
          @textarea={{@textarea}}
          @post={{@post}}
        />
        <PostFormMessageSimpleTag
          @text={{t 'feature.post-form.message.toolbar.tex'}}
          @icon='t'
          @opening='[tex]'
          @closing='[/tex]'
          @textarea={{@textarea}}
          @post={{@post}}
        />
        <PostFormMessageSimpleTag
          @text={{t 'feature.post-form.message.toolbar.trigger'}}
          @icon='magnifying-glass-minus'
          @opening='[trigger]'
          @closing='[/trigger]'
          @textarea={{@textarea}}
          @post={{@post}}
        />
        <PostFormMessageLink @post={{@post}} @textarea={{@textarea}} />
        <PostFormMessageList @post={{@post}} @textarea={{@textarea}} />
        <PostFormMessageImage @post={{@post}} @textarea={{@textarea}} />
        <PostFormMessageSimpleInput
          @title={{t 'feature.post-form.message.toolbar.video.title'}}
          @icon='youtube'
          @label={{t 'feature.post-form.message.toolbar.video.label'}}
          @prefix='fab'
          @opening='[video]'
          @closing='[/video]'
          @type='url'
          @post={{@post}}
          @textarea={{@textarea}}
        />
        <PostFormMessageSimpleInput
          @title={{t 'feature.post-form.message.toolbar.code.title'}}
          @icon='code'
          @label={{t 'feature.post-form.message.toolbar.code.label'}}
          @opening='[code]'
          @closing='[/code]'
          @useTextarea={{true}}
          @post={{@post}}
          @textarea={{@textarea}}
        />
        <PostFormMessageSimpleInput
          @title={{t 'feature.post-form.message.toolbar.quote.title'}}
          @icon='quote-right'
          @label={{t 'feature.post-form.message.toolbar.quote.label'}}
          @opening='[quote]'
          @closing='[/quote]'
          @useTextarea={{true}}
          @post={{@post}}
          @textarea={{@textarea}}
        />
        <PostFormMessageSimpleInput
          @title={{t 'feature.post-form.message.toolbar.spoiler.title'}}
          @icon='eye-slash'
          @label={{t 'feature.post-form.message.toolbar.spoiler.label'}}
          @opening='[spoiler]'
          @closing='[/spoiler]'
          @useTextarea={{true}}
          @post={{@post}}
          @textarea={{@textarea}}
        />
        <span class={{classNames this 'toolbar-overlay'}} />
      </div>
    </div>
  </template>
}

import FaIcon from '@fortawesome/ember-fontawesome/components/fa-icon';

<template>
  <span id='loading-indicator'>
    <FaIcon @icon='circle-notch' @spin={{true}} @size='2x' />
  </span>
</template>

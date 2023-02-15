import PostCreateController from './create';

export default class PostQuoteController extends PostCreateController {
  queryParams = ['PID', 'TID', 'page'];
}

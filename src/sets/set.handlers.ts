import {SetRepository} from './set.repo';
import {Next, NotFoundError, Response, Request} from 'restify';
import {IHandler} from '../IHandler';

export class SetHandlers implements IHandler {
  constructor(private setRepo: SetRepository) { }

  get(req: Request, res: Response, next: Next) {
    let setName = req.query['name'];
    this.setRepo.get(setName)
      .do(set => {
        if (!set) {
          throw new NotFoundError();
        }
      })
      .subscribe(data => res.send(data), next, next);
  }

  browse(req: Request, res: Response, next: Next) {
    this.setRepo.get().subscribe(data => res.send(data), next, next);
  }
}

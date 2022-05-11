import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UtilisateursService } from '../../utilisateurs/utilisateurs.service';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private utilisateurService: UtilisateursService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) {
          return true;
      }
      const request = context.switchToHttp().getRequest();
      console.log(request)
      const utilisateur = request.utilisateur;
      return true;
  }
}

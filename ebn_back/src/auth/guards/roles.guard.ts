import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UtilisateursService } from '../../utilisateurs/utilisateurs.service';
import { map, Observable } from 'rxjs';
import { Utilisateur } from '../../utilisateurs/entities/utilisateur.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UtilisateursService))
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
    const utilisateur: Utilisateur = request.user.utilisateur;

    console.log(utilisateur);

    return this.utilisateurService.findOne(utilisateur.id).pipe(
      map((utilisateur: Utilisateur) => {
        console.log(utilisateur);
        const hasRole = () => roles.indexOf(utilisateur.role) > -1;
        let hasPermission = false;

        if (hasRole()) {
          hasPermission = true;
        }
        return utilisateur && hasPermission;
      }),
    );
  }
}

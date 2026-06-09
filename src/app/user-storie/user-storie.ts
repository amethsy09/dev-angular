import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Activite {
  id: number;
  nom: string;
  type: 'SPORT' | 'HYDRATATION';
  valeur: number;
}

@Component({
  selector: 'app-user-storie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-storie.html',
  styleUrl: './user-storie.css'
})
export class UserStorie {

  activites = signal<Activite[]>(this.chargerStorage());

  nouveauNom = signal('');
  nouveauType = signal<'SPORT' | 'HYDRATATION'>('SPORT');
  nouvelleValeur = signal(0);

  totalCalories = computed(() =>
    this.activites()
      .filter(a => a.type === 'SPORT')
      .reduce((s, a) => s + a.valeur, 0)
  );

  totalEau = computed(() =>
    this.activites()
      .filter(a => a.type === 'HYDRATATION')
      .reduce((s, a) => s + a.valeur, 0)
  );

  bilanRestant = computed(() =>
    2000 - this.totalCalories()
  );

  objectifAtteint = computed(() =>
    this.totalEau() >= 1500 &&
    this.totalCalories() > 500
  );

  alerteDeshydratation = computed(() =>
    this.totalEau() < 1500
  );

  constructor() {
    effect(() => {
      localStorage.setItem(
        'activites',
        JSON.stringify(this.activites())
      );
    });
  }

  chargerStorage(): Activite[] {
    const data = localStorage.getItem('activites');
    return data ? JSON.parse(data) : [];
  }

  ajouterActivite() {

    const activite: Activite = {
      id: Date.now(),
      nom: this.nouveauNom(),
      type: this.nouveauType(),
      valeur: this.nouvelleValeur()
    };

    this.activites.update(a => [...a, activite]);

    this.nouveauNom.set('');
    this.nouvelleValeur.set(0);
  }

  supprimer(id: number) {
    this.activites.update(a =>
      a.filter(act => act.id !== id)
    );
  }
}
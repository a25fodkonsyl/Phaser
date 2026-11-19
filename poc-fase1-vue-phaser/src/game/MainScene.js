import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    this.avatar = this.add.circle(320, 200, 24, 0x10b981);

    this.etiqueta = this.add.text(320, 160, 'Anna', {
      fontSize: '18px', fontFamily: 'sans-serif', color: '#ffffff'
    }).setOrigin(0.5);

    // Ampliació 2: text d'estat sota el nom
    this.textEstat = this.add.text(320, 140, 'Disponible', {
      fontSize: '14px', fontFamily: 'sans-serif', color: '#cbd5e1'
    }).setOrigin(0.5);
  }

  update(time) {
    this.avatar.y = 200 + Math.sin(time * 0.004) * 8;
    this.etiqueta.setPosition(this.avatar.x, this.avatar.y - 38);
    // Ampliació 2: l'estat segueix l'avatar
    this.textEstat.setPosition(this.avatar.x, this.avatar.y - 58);
  }

  actualitzarNom(nouNom) {
    this.etiqueta?.setText(nouNom || 'Anònim');
  }

  // Ampliació 1
  canviarColor(hexColor) {
    this.avatar?.setFillStyle(hexColor);
  }

  // Ampliació 2
  actualitzarEstat(nouEstat) {
    this.textEstat?.setText(nouEstat);
  }
}
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { TI18nMap } from "@/types";

// const Translations = {
// 	asd: ""
// } as const satisfies TTest;

export const Translations = {
	NameLocalizations: {
		"en-US": "8ball",
		pl: "8ball",
		de: "8ball",
		fr: "8ball",
		"es-ES": "8ball",
		it: "8ball"
	},
	DescriptionLocalizations: {
		"en-US": "Magic 8Ball game!",
		pl: "Magiczna gra 8Ball!",
		de: "Magisches 8Ball-Spiel!",
		fr: "Jeu magique de la boule 8!",
		"es-ES": "¡Juego mágico de la bola 8!",
		it: "Gioco magico della palla 8!"
	},
	execute: {
		errorMessage: {
			"en-US": "An error occurred while executing the command",
			pl: "Wystąpił błąd podczas wykonywania polecenia",
			de: "Beim Ausführen des Befehls ist ein Fehler aufgetreten",
			fr: "Une erreur s'est produite lors de l'exécution de la commande",
			"es-ES": "Se produjo un error al ejecutar el comando",
			it: "Si è verificato un errore durante l'esecuzione del comando"
		}
	},
	options: {
		question: {
			NameLocalizations: {
				"en-US": "question",
				pl: "pytanie",
				de: "frage",
				fr: "question",
				"es-ES": "pregunta",
				it: "domanda"
			},
			DescriptionLocalizations: {
				"en-US": "Ask 8ball about future!",
				pl: "Zapytaj 8ball o przyszłość!",
				de: "Frage die 8ball nach der Zukunft!",
				fr: "Demandez à la boule 8 votre avenir!",
				"es-ES": "¡Pregúntale a la bola 8 sobre el futuro!",
				it: "Chiedi alla palla 8 del futuro!"
			}
		}
	}
} as const satisfies TI18nMap;

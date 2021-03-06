
class Game
{
	contentDirectoryPath: string;

	constructor(contentDirectoryPath: string)
	{
		this.contentDirectoryPath = contentDirectoryPath;
	}

	main(): void
	{
		// It may be necessary to clear local storage to prevent errors on
		// deserialization of existing saved items after the schema changes.
		// localStorage.clear();

		var mediaFilePaths = this.mediaFilePathsBuild();

		var mediaLibrary = MediaLibrary.fromFilePaths("../Content/", mediaFilePaths);

		var displaySizesAvailable =
		[
			new Coords(400, 300, 1),
			new Coords(640, 480, 1),
			new Coords(800, 600, 1),
			new Coords(1200, 900, 1),
			// Wrap.
			new Coords(200, 150, 1),
		];

		var display = new Display2D
		(
			displaySizesAvailable,
			FontNameAndHeight.default(),
			Color.byName("Gray"), Color.byName("White"), // colorFore, colorBack
			null // ?
		);

		var timerHelper = new TimerHelper(20);

		var controlBuilder = ControlBuilder.default();

		var worldCreator = WorldCreator.fromWorldCreate
		(
			() => new WorldExtended()
		);

		var universe = Universe.create
		(
			"Game",
			"0.0.0-20220216-0930", // version
			timerHelper,
			display,
			mediaLibrary,
			controlBuilder,
			worldCreator
		);
		universe.initialize
		(
			() => { universe.start(); }
		);
	}

	mediaFilePathsBuild(): string[]
	{
		var contentDirectoryPath = this.contentDirectoryPath;

		var fontDirectoryPath = contentDirectoryPath + "Fonts/";
		var imageDirectoryPath = contentDirectoryPath + "Images/";
		var soundEffectDirectoryPath = contentDirectoryPath + "Audio/Effects/";
		var soundMusicDirectoryPath = contentDirectoryPath + "Audio/Music/";
		var textStringDirectoryPath = contentDirectoryPath + "Text/";
		var videoDirectoryPath = contentDirectoryPath + "Video/";

		var mediaFilePaths =
		[
			imageDirectoryPath + "Titles/Opening.png",
			imageDirectoryPath + "Titles/Producer.png",
			imageDirectoryPath + "Titles/Title.png",

			imageDirectoryPath + "Agents/Agents.png",
			imageDirectoryPath + "Agents/Goblin.png",
			imageDirectoryPath + "Agents/Troll.png",

			soundEffectDirectoryPath + "Sound.wav",

			soundMusicDirectoryPath + "Music.mp3",
			soundMusicDirectoryPath + "Producer.mp3",
			soundMusicDirectoryPath + "Title.mp3",

			videoDirectoryPath + "Movie.webm",

			fontDirectoryPath + "Font.ttf",

			textStringDirectoryPath + "Instructions.txt",
		];

		return mediaFilePaths;
	}
}

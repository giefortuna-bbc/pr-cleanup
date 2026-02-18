## GitHub PR Cleanup Extension

This Chrome extension hides deployment messages in GitHub Pull Requests for a cleaner review experience.

### Installation

1. Clone this repo:
	```sh
	git clone https://github.com/giefortuna-bbc/pr-cleanup.git
	```
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the cloned `pr-cleanup` folder.

### Usage

1. Visit any GitHub Pull Request page.
2. Tick specific PR Timeline items you want to hide
3. `Show all hidden items` repeatedly clicks the Load more button (with 5 s intervals to allow for loading)

### Troubleshooting
- If the page take more than 5s to load more items, not all items will be shown. You will need to click `Show all hidden items` again.

### Contributing

Pull requests are welcome!

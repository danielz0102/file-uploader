import { setUpDialog } from './lib/setUpDialog.js'
import { setUpForm } from './lib/setUpForm.js'
import './partials/fileBtn.js'

setUpDialog('#newFolderDialog', '#newFolderDialogButton')
setUpDialog('#uploadDialog', '#uploadDialogButton')
setUpDialog('#deleteDialog', '#deleteDialogButton')

setUpForm('#new-folder-form')
setUpForm('#upload-form')

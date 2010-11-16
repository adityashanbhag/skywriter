require.def(['require', 'exports', 'module',
    'skywriter/plugins'
], function(require, exports, module,
    plugins
) {

/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Skywriter.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Skywriter Team (skywriter@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

var catalog = plugins.catalog;

function Logo() {
    var li = document.createElement('li');
    var img = document.createElement('img');
    img.setAttribute('src', catalog.getResourceURL('toolbar') + "/logo.png");
    img.setAttribute('class', 'skywriter-toolbar-logo');
    li.appendChild(img);
    this.element = li;
}

function OpenFileIndicator() {
    var li = document.createElement('li');
    li.innerHTML = "SampleProject &mdash; readme.txt";
    this.element = li;
}

function Save() {
    var li = document.createElement('li');
    li.innerHTML = "Save";
    this.element = li;
}

function PositionIndicator() {
    var li = document.createElement('li');
    li.innerHTML = "Row 0, Column 0";
    this.element = li;
}

exports.Logo = Logo;
exports.OpenFileIndicator = OpenFileIndicator;
exports.Save = Save;
exports.PositionIndicator = PositionIndicator;


});
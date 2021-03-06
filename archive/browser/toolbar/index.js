require.def(['require', 'exports', 'module',
    'toolbar/events',
    'skywriter/plugins'
], function(require, exports, module,
    events,
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

exports.startup = function(data, reason) {
    var catalog = plugins.catalog;
    catalog.addExtensionPoint("toolbaritem", {
        "description": "Toolbar item views",
        "params": [
            {
                "name": "name",
                "description": "name of this toolbar item",
                "type": "string"
            },
            {
                "name": "pointer",
                "description":
                    "pointer to a component that can be instantiated with new and has an element defined on it."
            }
        ],
        "register": "index#discoveredNewToolbarItem"
    });
    catalog.connect("themestyles", module.id, { "url": [ "toolbar.less" ] });
    catalog.connect("factory", module.id, { "name": "toolbar", "action": "new", "pointer": "index#ToolbarView" });
    catalog.connect("toolbaritem", module.id, { "name": "logo", "pointer": "items#Logo" });
    catalog.connect("toolbaritem", module.id, { "name": "openfileindicator", "pointer": "items#OpenFileIndicator" });
    catalog.connect("toolbaritem", module.id, { "name": "save", "pointer": "items#Save" });
    catalog.connect("toolbaritem", module.id, { "name": "positionindicator", "pointer": "items#PositionIndicator" });
};

exports.shutdown = function(data, reason) {
    catalog.disconnectAll(module.id);
    catalog.removeExtensionPoint("toolbaritem");
};

var Event = events.Event;
var catalog = plugins.catalog;

var discoveredNewToolbarItem = new Event();

function ToolbarView() {
    var elem = document.createElement("menu");
    elem.setAttribute('class', "skywriter-toolbar");
    elem.setAttribute('type', "toolbar");
    this.element = elem;

    this._items = [];

    var extensions = catalog.getExtensions('toolbaritem');
    extensions.forEach(this._discoveredNewToolbarItem.bind(this));
    discoveredNewToolbarItem.add(this._discoveredNewToolbarItem.bind(this));
}

ToolbarView.prototype = {
    _add: function(klass) {
        var item = new klass();
        this._items.push(item);
        this.element.appendChild(item.element);
    },

    _discoveredNewToolbarItem: function(extension) {
        extension.load().then(this._add.bind(this));
    }
};

exports.ToolbarView = ToolbarView;
exports.discoveredNewToolbarItem = discoveredNewToolbarItem;


});

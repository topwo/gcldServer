var Code = require('../../../../../shared/code');

module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
  this.serverId = app.get('serverId').split('-')[2];
};

//检测更新
var new_version = "0.0.1";
var force_version = "0.0.1";
Handler.prototype.checkUpdate = function(msg, session, next) {
    var s_ver_force = force_version.split('.');
    var s_ver = new_version.split('.');
    var s_v = msg.v.split('.');
    var ver_force = [parseInt(s_ver_force[0], 10), parseInt(s_ver_force[1], 10), parseInt(s_ver_force[2], 10)];
    var ver = [parseInt(s_ver[0], 10), parseInt(s_ver[1], 10), parseInt(s_ver[2], 10)];
    var v = [parseInt(s_v[0], 10), parseInt(s_v[1], 10), parseInt(s_v[2], 10)];
    var need_force_update = false;
    if(ver_force[0] > v[0]){
        need_force_update = true;
    }
    else if(ver_force[0] == v[0]){
        if(ver_force[1] > v[1]){
            need_force_update = true;
        }
        else if(ver_force[1] == v[1]){
            if(ver_force[2] > v[2]){
                need_force_update = true;
            }
        }
    }
    var need_update = false;
    if(ver[0] > v[0]){
        need_update = true;
    }
    else if(ver[0] == v[0]){
        if(ver[1] > v[1]){
            need_update = true;
        }
        else if(ver[1] == v[1]){
            if(ver[2] > v[2]){
                need_update = true;
            }
        }
    }
    if(need_force_update){
        next(null, Code.FORCE_UPDATE);
    }
    else if(need_update){
        next(null, Code.HAVE_NEW_VERSION);
    }
    else{
        Code.OK.msg = "不需要更新"
        next(null, Code.OK);
    }
};

// generate playerId
var id = 1;
/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function(msg, session, next) {
    var playerId = parseInt(this.serverId + id, 10);
    id += 1;
    session.bind(playerId);
    session.set('playerId', playerId);
    session.set('username', msg.username);
    session.set('password', msg.password);
    session.set('areaId', 1);
    session.on('closed', onUserLeave.bind(null, this.app));
    session.pushAll();
    Code.OK.playerId = playerId;
    next(null, Code.OK);
    console.log( msg.username);
};

var onUserLeave = function (app, session, reason) {
    if (session && session.uid) {
        app.rpc.area.playerRemote.playerLeave(session, {playerId: session.get('playerId'), areaId: session.get('areaId')}, null);
    }
};

/**
 * Publish route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.publish = function(msg, session, next) {
	var result = {
		topic: 'publish',
		payload: JSON.stringify({code: 200, msg: 'publish message is ok.'})
	};
  next(null, result);
};

/**
 * Subscribe route for mqtt connector.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.subscribe = function(msg, session, next) {
	var result = {
		topic: 'subscribe',
		payload: JSON.stringify({code: 200, msg: 'subscribe message is ok.'})
	};
  next(null, result);
};

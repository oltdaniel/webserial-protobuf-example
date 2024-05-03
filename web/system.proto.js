/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const SystemMessage = $root.SystemMessage = (() => {

    /**
     * Properties of a SystemMessage.
     * @exports ISystemMessage
     * @interface ISystemMessage
     * @property {IPing|null} [ping] SystemMessage ping
     * @property {IPong|null} [pong] SystemMessage pong
     * @property {ITime|null} [time] SystemMessage time
     */

    /**
     * Constructs a new SystemMessage.
     * @exports SystemMessage
     * @classdesc Represents a SystemMessage.
     * @implements ISystemMessage
     * @constructor
     * @param {ISystemMessage=} [properties] Properties to set
     */
    function SystemMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * SystemMessage ping.
     * @member {IPing|null|undefined} ping
     * @memberof SystemMessage
     * @instance
     */
    SystemMessage.prototype.ping = null;

    /**
     * SystemMessage pong.
     * @member {IPong|null|undefined} pong
     * @memberof SystemMessage
     * @instance
     */
    SystemMessage.prototype.pong = null;

    /**
     * SystemMessage time.
     * @member {ITime|null|undefined} time
     * @memberof SystemMessage
     * @instance
     */
    SystemMessage.prototype.time = null;

    // OneOf field names bound to virtual getters and setters
    let $oneOfFields;

    /**
     * SystemMessage message.
     * @member {"ping"|"pong"|"time"|undefined} message
     * @memberof SystemMessage
     * @instance
     */
    Object.defineProperty(SystemMessage.prototype, "message", {
        get: $util.oneOfGetter($oneOfFields = ["ping", "pong", "time"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new SystemMessage instance using the specified properties.
     * @function create
     * @memberof SystemMessage
     * @static
     * @param {ISystemMessage=} [properties] Properties to set
     * @returns {SystemMessage} SystemMessage instance
     */
    SystemMessage.create = function create(properties) {
        return new SystemMessage(properties);
    };

    /**
     * Encodes the specified SystemMessage message. Does not implicitly {@link SystemMessage.verify|verify} messages.
     * @function encode
     * @memberof SystemMessage
     * @static
     * @param {ISystemMessage} message SystemMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SystemMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.ping != null && Object.hasOwnProperty.call(message, "ping"))
            $root.Ping.encode(message.ping, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.pong != null && Object.hasOwnProperty.call(message, "pong"))
            $root.Pong.encode(message.pong, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.time != null && Object.hasOwnProperty.call(message, "time"))
            $root.Time.encode(message.time, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified SystemMessage message, length delimited. Does not implicitly {@link SystemMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof SystemMessage
     * @static
     * @param {ISystemMessage} message SystemMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    SystemMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a SystemMessage message from the specified reader or buffer.
     * @function decode
     * @memberof SystemMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {SystemMessage} SystemMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SystemMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SystemMessage();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.ping = $root.Ping.decode(reader, reader.uint32());
                    break;
                }
            case 2: {
                    message.pong = $root.Pong.decode(reader, reader.uint32());
                    break;
                }
            case 3: {
                    message.time = $root.Time.decode(reader, reader.uint32());
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a SystemMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof SystemMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {SystemMessage} SystemMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    SystemMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a SystemMessage message.
     * @function verify
     * @memberof SystemMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    SystemMessage.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        let properties = {};
        if (message.ping != null && message.hasOwnProperty("ping")) {
            properties.message = 1;
            {
                let error = $root.Ping.verify(message.ping);
                if (error)
                    return "ping." + error;
            }
        }
        if (message.pong != null && message.hasOwnProperty("pong")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.Pong.verify(message.pong);
                if (error)
                    return "pong." + error;
            }
        }
        if (message.time != null && message.hasOwnProperty("time")) {
            if (properties.message === 1)
                return "message: multiple values";
            properties.message = 1;
            {
                let error = $root.Time.verify(message.time);
                if (error)
                    return "time." + error;
            }
        }
        return null;
    };

    /**
     * Creates a SystemMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof SystemMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {SystemMessage} SystemMessage
     */
    SystemMessage.fromObject = function fromObject(object) {
        if (object instanceof $root.SystemMessage)
            return object;
        let message = new $root.SystemMessage();
        if (object.ping != null) {
            if (typeof object.ping !== "object")
                throw TypeError(".SystemMessage.ping: object expected");
            message.ping = $root.Ping.fromObject(object.ping);
        }
        if (object.pong != null) {
            if (typeof object.pong !== "object")
                throw TypeError(".SystemMessage.pong: object expected");
            message.pong = $root.Pong.fromObject(object.pong);
        }
        if (object.time != null) {
            if (typeof object.time !== "object")
                throw TypeError(".SystemMessage.time: object expected");
            message.time = $root.Time.fromObject(object.time);
        }
        return message;
    };

    /**
     * Creates a plain object from a SystemMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof SystemMessage
     * @static
     * @param {SystemMessage} message SystemMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    SystemMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (message.ping != null && message.hasOwnProperty("ping")) {
            object.ping = $root.Ping.toObject(message.ping, options);
            if (options.oneofs)
                object.message = "ping";
        }
        if (message.pong != null && message.hasOwnProperty("pong")) {
            object.pong = $root.Pong.toObject(message.pong, options);
            if (options.oneofs)
                object.message = "pong";
        }
        if (message.time != null && message.hasOwnProperty("time")) {
            object.time = $root.Time.toObject(message.time, options);
            if (options.oneofs)
                object.message = "time";
        }
        return object;
    };

    /**
     * Converts this SystemMessage to JSON.
     * @function toJSON
     * @memberof SystemMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    SystemMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for SystemMessage
     * @function getTypeUrl
     * @memberof SystemMessage
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    SystemMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/SystemMessage";
    };

    return SystemMessage;
})();

export const Ping = $root.Ping = (() => {

    /**
     * Properties of a Ping.
     * @exports IPing
     * @interface IPing
     */

    /**
     * Constructs a new Ping.
     * @exports Ping
     * @classdesc Represents a Ping.
     * @implements IPing
     * @constructor
     * @param {IPing=} [properties] Properties to set
     */
    function Ping(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Ping instance using the specified properties.
     * @function create
     * @memberof Ping
     * @static
     * @param {IPing=} [properties] Properties to set
     * @returns {Ping} Ping instance
     */
    Ping.create = function create(properties) {
        return new Ping(properties);
    };

    /**
     * Encodes the specified Ping message. Does not implicitly {@link Ping.verify|verify} messages.
     * @function encode
     * @memberof Ping
     * @static
     * @param {IPing} message Ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ping.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Ping message, length delimited. Does not implicitly {@link Ping.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Ping
     * @static
     * @param {IPing} message Ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ping.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Ping message from the specified reader or buffer.
     * @function decode
     * @memberof Ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Ping} Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ping.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Ping();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Ping message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Ping} Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ping.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Ping message.
     * @function verify
     * @memberof Ping
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Ping.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a Ping message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Ping
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Ping} Ping
     */
    Ping.fromObject = function fromObject(object) {
        if (object instanceof $root.Ping)
            return object;
        return new $root.Ping();
    };

    /**
     * Creates a plain object from a Ping message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Ping
     * @static
     * @param {Ping} message Ping
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Ping.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Ping to JSON.
     * @function toJSON
     * @memberof Ping
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Ping.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Ping
     * @function getTypeUrl
     * @memberof Ping
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Ping.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Ping";
    };

    return Ping;
})();

export const Pong = $root.Pong = (() => {

    /**
     * Properties of a Pong.
     * @exports IPong
     * @interface IPong
     */

    /**
     * Constructs a new Pong.
     * @exports Pong
     * @classdesc Represents a Pong.
     * @implements IPong
     * @constructor
     * @param {IPong=} [properties] Properties to set
     */
    function Pong(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Pong instance using the specified properties.
     * @function create
     * @memberof Pong
     * @static
     * @param {IPong=} [properties] Properties to set
     * @returns {Pong} Pong instance
     */
    Pong.create = function create(properties) {
        return new Pong(properties);
    };

    /**
     * Encodes the specified Pong message. Does not implicitly {@link Pong.verify|verify} messages.
     * @function encode
     * @memberof Pong
     * @static
     * @param {IPong} message Pong message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Pong.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Pong message, length delimited. Does not implicitly {@link Pong.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Pong
     * @static
     * @param {IPong} message Pong message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Pong.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Pong message from the specified reader or buffer.
     * @function decode
     * @memberof Pong
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Pong} Pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Pong.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Pong();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Pong message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Pong
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Pong} Pong
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Pong.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Pong message.
     * @function verify
     * @memberof Pong
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Pong.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates a Pong message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Pong
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Pong} Pong
     */
    Pong.fromObject = function fromObject(object) {
        if (object instanceof $root.Pong)
            return object;
        return new $root.Pong();
    };

    /**
     * Creates a plain object from a Pong message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Pong
     * @static
     * @param {Pong} message Pong
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Pong.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Pong to JSON.
     * @function toJSON
     * @memberof Pong
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Pong.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Pong
     * @function getTypeUrl
     * @memberof Pong
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Pong.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Pong";
    };

    return Pong;
})();

export const Time = $root.Time = (() => {

    /**
     * Properties of a Time.
     * @exports ITime
     * @interface ITime
     * @property {number|null} [current] Time current
     */

    /**
     * Constructs a new Time.
     * @exports Time
     * @classdesc Represents a Time.
     * @implements ITime
     * @constructor
     * @param {ITime=} [properties] Properties to set
     */
    function Time(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Time current.
     * @member {number} current
     * @memberof Time
     * @instance
     */
    Time.prototype.current = 0;

    /**
     * Creates a new Time instance using the specified properties.
     * @function create
     * @memberof Time
     * @static
     * @param {ITime=} [properties] Properties to set
     * @returns {Time} Time instance
     */
    Time.create = function create(properties) {
        return new Time(properties);
    };

    /**
     * Encodes the specified Time message. Does not implicitly {@link Time.verify|verify} messages.
     * @function encode
     * @memberof Time
     * @static
     * @param {ITime} message Time message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Time.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.current != null && Object.hasOwnProperty.call(message, "current"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.current);
        return writer;
    };

    /**
     * Encodes the specified Time message, length delimited. Does not implicitly {@link Time.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Time
     * @static
     * @param {ITime} message Time message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Time.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Time message from the specified reader or buffer.
     * @function decode
     * @memberof Time
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Time} Time
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Time.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Time();
        while (reader.pos < end) {
            let tag = reader.uint32();
            switch (tag >>> 3) {
            case 1: {
                    message.current = reader.uint32();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Time message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Time
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Time} Time
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Time.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Time message.
     * @function verify
     * @memberof Time
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Time.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.current != null && message.hasOwnProperty("current"))
            if (!$util.isInteger(message.current))
                return "current: integer expected";
        return null;
    };

    /**
     * Creates a Time message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Time
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Time} Time
     */
    Time.fromObject = function fromObject(object) {
        if (object instanceof $root.Time)
            return object;
        let message = new $root.Time();
        if (object.current != null)
            message.current = object.current >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Time message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Time
     * @static
     * @param {Time} message Time
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Time.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults)
            object.current = 0;
        if (message.current != null && message.hasOwnProperty("current"))
            object.current = message.current;
        return object;
    };

    /**
     * Converts this Time to JSON.
     * @function toJSON
     * @memberof Time
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Time.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Time
     * @function getTypeUrl
     * @memberof Time
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Time.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Time";
    };

    return Time;
})();

export { $root as default };

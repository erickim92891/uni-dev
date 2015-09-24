/**
 * Decorator for Exception handler
 * @namespace Blocks
 */
(function () {
	'use strict';
	
	angular
		.module ('blocks.exception')
		.config (Config);
	
	// Inject dependencies
	Config.$inject = ['$provide'];
	
	/**
	 * @namespace Exception
	 * @desc Exception handler configuration
	 * @memberOf Blocks
	 */
	function Config ($provide) {
		$provide.decorator ('$exceptionHandler', ExtendExceptionHandler);
	}
	
	// Inject dependencies
	ExtendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', '$logger'];
	
	/**
     * Extend the $exceptionHandler service to also display a toast.
     * @param  {Object} $delegate
     * @param  {Object} exceptionHandler
     * @param  {Object} logger
     * @return {Function} the decorated $exceptionHandler service
     */
    function ExtendExceptionHandler ($delegate, exceptionHandler, $logger) {
        return function (exception, cause) {
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
            var errorData = {exception: exception, cause: cause};
            
			exception.message = appErrorPrefix + exception.message;
            $delegate (exception, cause);
            /**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
            $logger.error (exception.message, errorData);
        };
    }
}) ();
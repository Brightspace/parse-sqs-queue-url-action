const core = require( '@actions/core' );

const queueUrlRegex = /^https:\/\/sqs\.(?<region>[a-z0-9-]+).amazonaws\.com\/(?<account>\d+)\/(?<name>.+)$/;

try {
	const queueUrl = core.getInput( 'sqs-queue-url' );
	if( !queueUrl ) {
		core.setFailed( 'Input \'sqs-queue-url\' not set.' );
	}

	const match = queueUrlRegex.exec( queueUrl );
	if( !match ) {
		core.setFailed( `Invalid 'sqs-queue-url' input provided: ${queueUrl}` );
	}

	core.setOutput( 'aws-account-id', match.groups[ 'account' ] );
	core.setOutput( 'aws-region', match.groups[ 'region' ] );
	core.setOutput( 'sqs-queue-name', match.groups[ 'name' ] );

} catch( error ) {
	core.setFailed( error.message );
}

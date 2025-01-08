import SwiftUI

struct ContentView: View {
    @State private var counter = 0

    var body: some View {
        VStack(spacing: 20) {
            Text("Counter: \(counter)")
                .font(.largeTitle)
            HStack {
                Button("Increment") {
                    counter += 1
                }
                .padding()
                Button("Decrement") {
                    counter -= 1
                }
                .padding()
                Button("Initial") {
                    counter = 0
                }
                .padding()
            }
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
